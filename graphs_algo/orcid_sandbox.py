import requests

# Replace with your ORCID Public API client credentials
CLIENT_ID = 'APP-1W00QPNCPF1VK3WB'
CLIENT_SECRET = 'b315dfef-4e95-4644-935c-177194a435e5'
BASE_URL = 'https://pub.orcid.org/v3.0'


# Function to get access token
def get_access_token(client_id, client_secret):
    """Fetch the access token for the ORCID Public API."""
    token_url = 'https://orcid.org/oauth/token'
    payload = {
        'client_id': client_id,
        'client_secret': client_secret,
        'grant_type': 'client_credentials',
        'scope': '/read-public'
    }
    response = requests.post(token_url, data=payload)
    response.raise_for_status()  # Raise an error for bad responses
    return response.json()['access_token']


# Function to search for researchers
def search_researchers(query, access_token):
    """Search for researchers in the ORCID registry."""
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Accept': 'application/json'
    }
    search_url = f'{BASE_URL}/search?q={query}'
    response = requests.get(search_url, headers=headers)
    response.raise_for_status()  # Raise an error for bad responses
    return response.json()


# Function to fetch a researcher's public record
def get_researcher_record(orcid_id, access_token):
    """Retrieve the public data of a researcher by ORCID ID."""
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Accept': 'application/json'
    }
    record_url = f'{BASE_URL}/{orcid_id}'
    response = requests.get(record_url, headers=headers)
    response.raise_for_status()  # Raise an error for bad responses
    return response.json()


# Extract relevant information from researcher data
def extract_researcher_info(researcher_data):
    """Extract name, surname, and publication titles."""
    # Extract name
    given_name = researcher_data.get("person", {}).get("name", {}).get("given-names", {}).get("value", "")
    family_name = researcher_data.get("person", {}).get("name", {}).get("family-name", {}).get("value", "")
    full_name = f"{given_name} {family_name}"

    # Extract publication titles
    works = researcher_data.get("activities-summary", {}).get("works", {}).get("group", [])
    titles = []
    for work_group in works:
        work_summaries = work_group.get("work-summary", [])
        for summary in work_summaries:
            title = summary.get("title", {}).get("title", {}).get("value", "")
            if title:
                titles.append(title)

    return full_name, titles


if __name__ == '__main__':
    # Get the access token
    token = get_access_token(CLIENT_ID, CLIENT_SECRET)

    # Search for researchers
    query = 'power systems'
    search_results = search_researchers(query, token)

    # Process each researcher
    for result in search_results.get('result', [])[:1]:  # Process only the first result
        orcid_id = result.get('orcid-identifier', {}).get('path')
        researcher_data = get_researcher_record(orcid_id, token)
        print(f"ORCID ID: {researcher_data}")
    #
    #     if orcid_id:
    #         try:
    #             researcher_data = get_researcher_record(orcid_id, token)
    #             researcher_name, publication_titles = extract_researcher_info(researcher_data)
    #
    #             print(f"Researcher Name: {researcher_name}")
    #         finally:
    #             print("")
    #         # print("Publication Titles:")
    #         # for idx, title in enumerate(publication_titles, start=1):
    #         #     print(f"{idx}. {title}")
