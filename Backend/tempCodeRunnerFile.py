from youtubesearchpython import VideosSearch

def fetch_youtube_videos(topic, limit=5):
    videos_search = VideosSearch(topic, limit=limit)
    results = videos_search.result()

    video_list = []
    for video in results['result']:
        video_list.append({
            'title': video['title'],
            'url': video['link']
        })
    return video_list

# Test
videos = fetch_youtube_videos("cloud computing")
for v in videos:
    print(f"{v['title']} -> {v['url']}")
