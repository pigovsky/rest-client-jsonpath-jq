# Intro

I searched the web for a tool combining a http REST client with 
json inspecting tools like jsoneditor and jsonpath.

I have not found such a tool and decided to develop it myself.

My colleague, Oleksandr Kriuchenko, suggested me to develop this 
tool using js and html to increase its crossplatformness and
independence on jvm (which is inavailable in some user environments).

I am open to receive any feature requests and PRs )))

# Current features

* send a http request with specified method, headers and body
* save the request into request history
* update the request if it matches with method and url of a previous request in the history
* inspect response as a text and as a json in jsoneditor
* modify the response body and view the updated version in the jsoneditor
* query the response with jsonpath and inspect the result in a separate text area

# Future features

* a request progress indicator like "Loading..."
* button to pretty-format response
* copy the response to the clipboard
* download the response as a file
* add a jsoneditor for the jsonpath result text area
* search historical request by a text pattern
* query a response with jq
* add a settings page configuring conditional and unconditional headers
* ability to receive service addresses from Consul and Marathon

