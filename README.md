# subconscious-training-program


Thoughts:
In the playground under connect tools you can add a tool. When the side pannel opens there is no save button- you just click the x in the corner. A save button that closes the side bar would be nice. 

In the Playground, a way to save the users last tools they used. Every time I left the page and returned it would reset to Parallel Search. 

The playground doesnt allow for users to use the Structured Output like the API does. I wanted to play around with Structured Output because that was key to my UI design. Going through the api every time left me slightly frustrated.

Is there a way to allow the agent to decide what a parameter should be? For example I wanted the agent to decide the number of past days for running. I dont want it to rely on the frontend to give it that parameter.  

A tool to allow the user to build api request for their sdk. When you were building a new tool, there was a manual configuration. It was so useful. I would love a tool in the api reference or guide that would help me build a api request.  I struggled with getting the tools schema right and then getting my structured output right. For example: It isnt clear what "type" a saved tool is. When you create the tool you click "type" = function. However, in the api request it should "type" should equal platform. This blocked me for a bit. --I noticed a show me the code in the agent runs, it was a little hard to find. 

A refresh button on the agents run page. I had to do a manual refresh.

Clarificiation on what the id of a saved tools is. When you create a tool you give it a name. However, when you want to use that saved tool in your api request its now called id. IT was unclear that name == id. 

Question: how does the structured output incluence the response? Does the model see that it needs a structure output at the beginning or should I include what desired formate in the prompt so the model knows the outcode? Questions for quality prompt engineering.

