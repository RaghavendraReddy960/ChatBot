#include <stdio.h>
#include <string.h>
#include <curl/curl.h>
#include <curl/easy.h>

// Requirments
// sudo apt-get install libcurl4-openssl-dev

// Running
// gcc rich_text.c -lcurl -o rich_text
// ./rich_text path lang

int main(int argc, char *argv[]){
  CURL *curl;
  CURLcode res;
  curl = curl_easy_init();
  if(curl) {
    curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "POST");
    curl_easy_setopt(curl, CURLOPT_URL, "https://asr.iiit.ac.in/ganesh/docs//");
    curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L);
    curl_easy_setopt(curl, CURLOPT_DEFAULT_PROTOCOL, "https");
    struct curl_slist *headers = NULL;
    headers = curl_slist_append(headers, "accept: application/json");
    curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
    curl_mime *mime;
    curl_mimepart *part;
    mime = curl_mime_init(curl);
    part = curl_mime_addpart(mime);
    curl_mime_name(part, "uploaded_file");
    curl_mime_filedata(part, argv[1]);
    part = curl_mime_addpart(mime);
    curl_mime_name(part, "lang");
    curl_mime_data(part, argv[2], CURL_ZERO_TERMINATED);
    curl_easy_setopt(curl, CURLOPT_MIMEPOST, mime);
    curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 0L);
    res = curl_easy_perform(curl);
    if(res != CURLE_OK)
      fprintf(stderr, "curl_easy_perform() failed: %s\n",
              curl_easy_strerror(res));
    curl_mime_free(mime);
  }
  curl_easy_cleanup(curl);
  return (int)res;
}



