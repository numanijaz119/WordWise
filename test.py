import requests

# Your API access token
ACCESS_TOKEN = ''
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
