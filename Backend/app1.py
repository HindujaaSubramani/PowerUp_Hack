from flask import Flask, request, jsonify
from flask_cors import CORS
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential
from youtubesearchpython import VideosSearch
import os
import re
from dotenv import load_dotenv

app = Flask(__name__)

# Allow CORS only for your frontend
CORS(app, resources={r"/*": {"origins": "http://localhost:8080"}}, supports_credentials=True)

load_dotenv()

GITHUB_TOKEN = os.environ["GITHUB_TOKEN"]
MODEL_NAME = "openai/gpt-4.1"
ENDPOINT = "https://models.github.ai/inference"

client = ChatCompletionsClient(
    endpoint=ENDPOINT,
    credential=AzureKeyCredential(GITHUB_TOKEN),
)

# -------------------- Quiz Generation --------------------
def generate_quiz(domain):
    prompt = f"""
Generate exactly 10 multiple-choice questions (MCQs) for the topic: {domain}.
Each question should have 4 options (A, B, C, D) and the correct answer must be specified.

Format:
Question: <Question text>
A) <Option 1>
B) <Option 2>
C) <Option 3>
D) <Option 4>
Correct Answer: <Correct option (A/B/C/D)>
"""
    response = client.complete(
        messages=[
            SystemMessage("You are a quiz master."),
            UserMessage(prompt),
        ],
        temperature=0.7,
        top_p=1,
        model=MODEL_NAME
    )

    raw_quiz = response.choices[0].message.content.strip()
    #print("🧠 Raw LLM Output:\n", raw_quiz)  Debugging log
    parsed_quiz = parse_quiz_text(raw_quiz)
    return parsed_quiz

def parse_quiz_text(quiz_text):
    questions = []
    parts = re.split(r"Question:\s*", quiz_text.strip())[1:]

    for part in parts:
        try:
            question_match = re.match(r"(.*?)\nA\)", part.strip(), re.DOTALL)
            question = question_match.group(1).strip() if question_match else ""

            options = []
            for label in ['A', 'B', 'C', 'D']:
                option_match = re.search(rf"{label}\)\s*(.*?)\n", part + "\n")
                options.append(option_match.group(1).strip() if option_match else "")

            correct_letter_match = re.search(r'Correct Answer:\s*([A-D])', part)
            correct_letter = correct_letter_match.group(1).strip() if correct_letter_match else "A"
            correct_answer = options[ord(correct_letter) - ord('A')]

            if question and all(options):
                questions.append({
                    "question": question,
                    "options": options,
                    "correctAnswer": correct_answer
                })
        except Exception as e:
            print(f"⚠️ Error parsing question: {e}")
            continue

    return questions

@app.route('/generate_quiz', methods=['POST'])
def quiz_endpoint():
    try:
        data = request.get_json()
        domain = data.get('domain')
        if not domain:
            return jsonify({"error": "Missing 'domain' in request body"}), 400

        quiz = generate_quiz(domain)
        return jsonify(quiz), 200

    except Exception as e:
        print(f"❌ Error in /generate_quiz: {e}")
        return jsonify({"error": str(e)}), 500


# -------------------- YouTube Videos --------------------
def fetch_youtube_videos(topic, limit=5):
    videos_search = VideosSearch(topic, limit=limit)
    results = videos_search.result()
    video_list = [{'title': v['title'], 'url': v['link']} for v in results['result']]
    return video_list

@app.route("/recommend_videos", methods=["GET"])
def recommend_videos():
    topic = request.args.get("topic")
    if not topic:
        return jsonify({"error": "Please provide a topic parameter"}), 400

    videos = fetch_youtube_videos(topic)
    return jsonify({"videos": videos})


# -------------------- Career Roadmap Generation --------------------
def generate_roadmap(role):
    prompt = f"""
Create a detailed career roadmap for becoming a {role}.
Include:
1. Skills to learn (in stages)
2. Tools & technologies to master
3. Projects to build
4. Suggested certifications or courses
5. Time-based breakdown (e.g., Month 1–3, Month 4–6, etc.)
"""
    response = client.complete(
        messages=[
            SystemMessage("You are a career advisor."),
            UserMessage(prompt),
        ],
        temperature=0.8,
        top_p=1,
        model=MODEL_NAME
    )
    return response.choices[0].message.content.strip()

@app.route("/generate_roadmap", methods=["POST"])
def roadmap_endpoint():
    data = request.json
    role = data.get("role")
    if not role:
        return jsonify({"error": "Please provide a role"}), 400

    roadmap = generate_roadmap(role)
    return jsonify({"roadmap": roadmap})


# -------------------- Run Flask Server --------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
