# Zen Training

PROBLEM: Many people I've worked with have no idea how to construct their training program when they first came to me.



SOLUTION: I created a user-friendly, science-based, and individualized responsive full-stack application:

|| A training coach and workout database ||

**Link to project:**

[Zen Training](https://js-react-hypertrophy-app.web.app/)

![App Logo](https://drive.google.com/uc?export=view&id=1sU_QAk5b6znlI9fhuEPg1-dYt-8u6iD9) ![App Screenshot](https://drive.google.com/uc?export=view&id=1y1xqrysg4fbJEtK0yh2yhaD6wLOgxOau)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, React, Node, Firebase as an SaaS.

-Users can CREATE programs, RUN them to eventual COMPLETION, VIEW a list of them and have many utility options like DELETING them & ADDING notes.

-Includes many custom features, like selecting from a list of logos/icons, creating new custom exercises, etc.

## Optimizations (*Contributions Welcome*)

-Create a darker theme for Dark Mode, and make it toggle-able.

-Add a level and experience feature, which will fill up with each completion step: Creating a program, logging a set, reading the guidebook, adding a note, creating a custom exercise, completing a day/week/meso, etc.

-Changing the backend structure, from SaaS: Firebase -> Express, MongoDB/PostgreSQL, Cloudinary, Passport, etc.

-Implement styles from Bootstrap/Tailwind CSS, instead of using css modules.

-Create a couple of pre-made programs that the user can choose from if they don't want to create their own.

-Implement tooltips for a more seamless experience, instead of the current guide-book menu with instructions.

-Reorganizing with MVC strucure after the transition from SaaS Firebase/React -> MERN Stack

-Writing new pseudocode to explain different parts of the codebase

## Lessons Learned:

-Firestore is a 1D array structure, and needs the structure of your front-end code to be flattened before sending it to their DB.

-Don't ask 5 different people about their opinions on the logo for the app, and if you do, be prepared for all of them to choose the 5 different options that you sent them, in that case, make a toggle feature to be able to use them all, like I had to.

-There are a lot of instances with React lifecycles where the display is not updated due to the stage where changes are altered or changed, so always wait with asynch await or setTimeouts(only if absolutely necessary).

-Make sure the DB structure ALWAYS matches as close as possible to the codebase structure of the data to be fetched, updated, deleted, created, etc. If not, many things will break in the process and will need to be re-structured to fix.

-Don't let any components get too large and bloated. If so, even if they are a large component, like a core page, such as CreateMeso.js. If you don't offload as much as possible, especially on the bigger components, to smaller utlity components or child components to be rendered by that parent, then you will have way too much code in some components, and it makes debugging, implementing new features, etc., way more cumbersome.
