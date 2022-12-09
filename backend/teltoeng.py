
import os
from google.oauth2 import service_account
from google.cloud import translate

project_id = "btp2-367508"
assert project_id
parent = f"projects/{project_id}"
credentials = service_account.Credentials.from_service_account_file("my-translation-sa-key.json")
client = translate.TranslationServiceClient(credentials=credentials)

sample_text = "హలో వరల్డ్!"
target_language_code = "en"

response = client.translate_text(
    contents=[sample_text],
    target_language_code=target_language_code,
    parent=parent,
)

for translation in response.translations:
    print(translation.translated_text)