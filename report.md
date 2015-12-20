Day 1 report

Vagrant :
	Is a tool for building complete development environments. With an easy-to-use workflow and focus on automation, Vagrant lowers development environment setup time, increases develpment/production paraty, and makes the "works on my machine" excuse a relic of the past. Vagrant utilises virtual machines like VirtualBOx, VMware, AWS and more.

VirtualBox :
	Is a general-purpose full virtualizer for x86 hardware, targeted server, desktop and embedded use.

Grunt :
	Is a JavaScript based command line build tool that helps developers automate repetitive tasks, It can perform tasks like minification, compilation, unitn testing, linting and more.

npm : 
	is a package manager for JavaScript based projects and a default one for nodejs.

nodejs :
	Is an open-source, cross-platform runtime envrionment for developing server-side web applications. Application are written in JavaScript and can be then run on "any" operating system.

Bower : 
	Is a package manager for JavaScript libraries that allows you to define, version and retrieve your dependencies.



Wraw up
Jenkins calls 2 scripts
dockerbuild.sh 
- which builds the docker build on the "build server"

DeployToProd.sh 
- which logs into docker.com and pushes the docker build. 
- Then it logs into the production server thundera.org and copies the deploydocke.sh script which is part of the version control
- deploydocker.sh kills the running container and fetches the new version of it and then starts it up. it takes two parameters wich are defined in jenkins, the port (9001) and the name of the project to update (konnigud/tictactoe).
- The server is up and running and can be accessed online http://thundera.org:9001
- 

About the work
I finished the unittests in time but when i got to the acceptance tests it turns out my implementeation would not(or at least i could not) adapt to the eventstore and data management. It needed an overhaul which was done but took its time.
Now all unittests and accepantece tests, including the fluent api, are working and if they fail the build pipeline stops.

Could not implement the the build pipline extensions and what came after that.

About the class.
Thought it was a great class with allot of very interesting concepts which i would have loved to go deeper into specially the load tests. Alas do to allot of sickness at home the time needed to delve into the subject was hard to come by. Thank you for the two extra days:)

One remark the descriptions of how to set things up and implemt them could be cleared as I was trying to do most of the work at home by myself it was very hard to figure out if I was doing it right and where to start.

Thanks for a great class

regards
Konni

