nstallation

Install the package:

yarn add @vapi-ai/web

or w/ npm:

npm install @vapi-ai/web

Import the package:

import Vapi from "@vapi-ai/web";

Then, create a new instance of the Vapi class, passing one of the following as a parameter to the constructor:

    your Public Key
    a generated JWT

const vapi = new Vapi("your-public-key-or-jwt");

You can find your public key in the Vapi Dashboard

. You can generate a JWT on the backend following JWT Authentication instructions.
Starting a Call

Assistants can either be created on the fly (temporary) or created & persisted to your account (persistent).



Persistent Assistant

Then, you can copy the assistant’s ID at the top of the assistant detail page:

Now we can call .start(), passing the persistent assistant’s ID: 646ff636-4bbc-47d8-81c2-e2bc22fe2396

vapi.start("646ff636-4bbc-47d8-81c2-e2bc22fe2396");