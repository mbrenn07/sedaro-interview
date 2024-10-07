# Project Writeup

(live site found at https://sedaro.mbrenn.net/)

## Standardization

For my initial work on this project I brought it in line with other personal projects I've worked on, turning the Python backend into a Flask server and adding Dockerfiles I use for CI/CD with Google Cloud (GCP). I then used GCP to set up Github actions that build and host an image whenever I push to main, and used their DNS services to set up a custom subdomain under one I already owned. 

I performed the initial changes with the Flask server because I wanted a much more robust system that I could change later in the process, so converting the project to a standard backend and frontend with communication was extremely helpful. Since I wasn't building for robustness, a development Flask server works well enough for my purposes. If I had more time, I would set up the build process to host a production ready server instead.

## Investigation

After this, I wanted to get a better idea of what kind of data the simulator was actually generating and displaying so I could provide labels for the user. Once I realized it displayed the paths of a planet and a satellite I labeled the plot accordingly. I also added a parameter for the number of iterations to generate to the simulator's endpoint at this stage.

I wanted to understand the system so I could understand what kind of changes would benefit it, and these smaller labeling changes helped me to build an understanding of the simulator. I chose not to change the simulator's core functionality during this process as I am not a SME, instead I wanted to focus on the frontend and human-computer interaction components of the overall design. If I had more time, I would have made the simulator more robust so that it could iterate on a previously run simulation when needed, allowing me to have much more data on the frontend without significant lag times

## Visualization

Once I understood the visualization, I decided I wanted to make it as clear as possible to users. Since the simulation tracks x and y coordinates over time, I knew I wanted to create an animation that demonstrated their travel through space over time. Plotly would be insufficent for this task, so I recreated the visualization in D3. I then added icons to make it clear what each line on the plot represented, and implemented some logic to animate everything. Finally, I added an appropriate background.

My goal for the final product was a coherent and instantly understandable user experience. I wanted users to understand what was being visualized the moment they saw the visualization, without any real need for axes or labels, although those are included. The starry background, icons, and animation work together to set the stage, actors, and performance respectively. There are certainly some usability sacrifices here, as d3 has less features by default than Plotly, but I believe that this visualization can be understood by anyone who sees it the first time they do without any need for text. If I had more time, I would have reimplemented features like zooming, scrolling, and specific point viewing in d3. 
