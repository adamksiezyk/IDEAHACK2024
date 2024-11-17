import requests
import json
import time

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
    response.raise_for_status()
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
    response.raise_for_status()
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
    response.raise_for_status()
    return response.json()


# Function to extract co-authors recursively
def extract_co_authors(researcher_data, access_token):
    """Extract co-authors from the researcher's publications."""
    works = researcher_data.get("activities-summary", {}).get("works", {}).get("group", [])
    all_co_authors = set()  # Use a set to avoid duplicates

    for work_group in works:
        work_summaries = work_group.get("work-summary", [])
        for summary in work_summaries:
            title = summary.get("title", {}).get("title", {}).get("value", "Unknown Title")
            put_code = summary.get("put-code", None)

            if put_code:
                try:
                    # Fetch detailed work information to extract contributors
                    headers = {
                        'Authorization': f'Bearer {access_token}',
                        'Accept': 'application/json'
                    }
                    detailed_work_url = f"{BASE_URL}/{researcher_data['orcid-identifier']['path']}/work/{put_code}"
                    response = requests.get(detailed_work_url, headers=headers)
                    response.raise_for_status()
                    detailed_work = response.json()

                    # Extract co-author names
                    contributors = detailed_work.get("contributors", {}).get("contributor", [])
                    for contributor in contributors:
                        print(contributor)
                        co_author_name = contributor.get("credit-name", {}).get("value")
                        if co_author_name:
                            all_co_authors.add(co_author_name)
                except requests.exceptions.RequestException as e:
                    print(f"Failed to fetch detailed work info for '{title}' (PUT Code: {put_code}). Error: {e}")
                except Exception as e:
                    print(f"An error occurred while processing work '{title}': {e}")

    return list(all_co_authors)


def get_publication_record(orcid_id, put_code, access_token):
    """
    Fetch detailed information about a specific publication record.

    Args:
        orcid_id (str): The ORCID ID of the researcher.
        put_code (str): The PUT code of the publication.
        access_token (str): A valid access token for the ORCID API.

    Returns:
        dict: Detailed information about the publication.
    """
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Accept': 'application/json'
    }
    publication_url = f"{BASE_URL}/{orcid_id}/work/{put_code}"

    try:
        response = requests.get(publication_url, headers=headers)
        response.raise_for_status()  # Raise an error for bad responses
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching publication record (PUT Code: {put_code}): {e}")
        return {}


if __name__ == '__main__':
    # Get the access token
    token = get_access_token(CLIENT_ID, CLIENT_SECRET)


    # Search for a researcher (replace with the actual query)
    query = "power system"  # Replace with the researcher's name or a keyword
    search_results = search_researchers(query, token)

    for result in search_results.get('result', [])[:1]:
        orcid_id = result.get('orcid-identifier', {}).get('path')
        print(f"Processing ORCID ID: {orcid_id}")

        if orcid_id:
            try:
                # Fetch researcher record
                researcher_data = get_researcher_record(orcid_id, token)

                # Extract co-authors recursively
                co_authors = extract_co_authors(researcher_data, token)

                print(f"Co-authors for researcher {orcid_id}:")
                for co_author in co_authors:
                    print(f"- {co_author}")

            except requests.exceptions.RequestException as e:
                print(f"Error while processing researcher {orcid_id}: {e}")

    print("Processing complete.")
