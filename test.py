import requests

# Your API access token
ACCESS_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZWFkMTQ4OWY4ZDY0Y2FmODM4ZGZjYjljZDZiNzc4ZTExMzM1MjJkODI5Y2JlYzUzYWUzYzUzYWQ3ZTExYTI2NTA1NzMyMGU5NWY4OTExMTUiLCJpYXQiOjE3NDU4Mjg2NjQuMjk5NjcxLCJuYmYiOjE3NDU4Mjg2NjQuMjk5NjczLCJleHAiOjQ5MDE1MDIyNjQuMjg0NzY5LCJzdWIiOiI4MzYwIiwic2NvcGVzIjpbXX0.zRsE9uEnWzz3QKDCxy0ymlKDK3CbZVoVWnC5Irvz4zO6ExUxC2fq8pj497l87ysVEF7Xx8RGIi6PvRn-O2CVQ2cswtLKuAbEZAaYxucq_I5gEz_d3tolopUIqgrdVHXS3k4yWnBRTapC-lUOk3N24tlC0JbPYjn-cT5wD6lCpPYn28kCixDzblDEOLrsZ2W28AI7GA698ozIWKFmeFsZZLu-uaS9tUcyyu81H1HFyAP2vgnq4U6-GFmUnLx5hXE6fjKUHHyXaTMlTvtau1p5r1k9Ejhz7zGek2IBeHAc5e97XzBF69owhLC3oYnteriku2brURNt28tSyZADw76YIfPjk78drKL1KiR3C3O18tW7KAUc0SQPS8rMvf3XAJwePb9P3gevW5DmQG0HfOeXl6FKaQ1ZguFBvQfIX11gpx8c_124LqCuWlzrRZQgoP9CPgpNTUi6YB1pEnqqf6LHJLK-_rFjJxl_XeDm7Z7nVjdtmRPGUpDynlXTUO0oXeV3YXrdi1OR4M2kvj7SfAxZ9YWyZNWCvMGJ3LDSsiLHKH7YQTolpXZctT008zGUSmSa30BQLrmz01nF8ST_WAud5JNABBMcq_ZuW48M26t_wm42u9dlXN6abHZqoo5mHzyJs1dC8TXgBJ3ErKR3lfZ7wlLi__U6WsSuwNCXilCrR4U'

# API endpoint
url = 'https://api.plugandpay.nl/v2/orders'

# Headers
headers = {
    'Accept': 'application/json',
    'Authorization': f'Bearer {ACCESS_TOKEN}',
    'User-Agent': 'CustomApiCall/2'
}

params = {
    # 'tag': 'Keuken gastenlijst',
    'product_group': 'Keuken-gastenlijst',
}
# Make the request
response = requests.get(url, headers=headers, params=params)  # Fetch 5 products

# Check the response
if response.status_code == 200:
    data = response.json()
    products = data.get('data', [])
    
    # Print each product
    for product in products:
        print(product)
else:
    print(f"Failed to fetch products. Status code: {response.status_code}")
    print(response.text)
