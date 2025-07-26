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
You are an expert educational content creator. 
Generate exactly 10 multiple-choice questions (MCQs) strictly for academic and professional learning purposes on the topic: "{domain}".
If the topic is abbreviated (like FSD), interpret it in the context of education, training, or professional development (e.g., Full Stack Development).

Each question must have 4 options (A, B, C, D) and clearly specify the correct answer at the end.

Strict format:
Question 1: <Question text>
A) <Option 1>
B) <Option 2>
C) <Option 3>
D) <Option 4>
Correct Answer: <Correct option (A/B/C/D)>
"""
    response = client.complete(
        messages=[
            SystemMessage("You are a quiz master focusing only on education and professional development topics."),
            UserMessage(prompt),
        ],
        temperature=0.7,
        top_p=1,
        model=MODEL_NAME
    )

    raw_quiz = response.choices[0].message.content.strip()
    parsed_quiz = parse_quiz_text(raw_quiz)

    # Fallback: If parsing fails, return raw text as one dummy question
    if not parsed_quiz:
        parsed_quiz = [{
            "question": f"Unable to parse quiz for {domain}. Here’s the raw output:",
            "options": [raw_quiz[:50], "Option B", "Option C", "Option D"],
            "correctAnswer": raw_quiz[:50]
        }]
    return parsed_quiz


def parse_quiz_text(quiz_text):
    questions = []
    blocks = re.split(r"(?:Question\s*\d*:|Question:)", quiz_text)[1:]

    for block in blocks:
        lines = [line.strip() for line in block.strip().split("\n") if line.strip()]
        if not lines:
            continue

        question = lines[0]
        options = []
        for label in ["A)", "B)", "C)", "D)"]:
            for line in lines:
                if line.startswith(label):
                    options.append(line[len(label):].strip())
                    break

        correct_letter = None
        for line in lines:
            match = re.search(r"Correct Answer[:\s]*([A-D])", line, re.IGNORECASE)
            if match:
                correct_letter = match.group(1).upper()
                break

        if question and len(options) == 4 and correct_letter in ["A", "B", "C", "D"]:
            correct_answer = options[ord(correct_letter) - ord("A")]
            questions.append({
                "question": question,
                "options": options,
                "correctAnswer": correct_answer
            })

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
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
