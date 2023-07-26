General Description of app: A hypertrophy training log/programming app that uses an algorithm to recommend changes and autoregulates progressions in training variables based on the biofeedback you give it during logging.

Design features of app(Full viewport web version):

Sidebar: RP:Hypertrophy Beta version #(0.19.6), (calendar icon) Current day tab, (folder icon) Mesocycles tab, (wrench icon) Custom exercises, (plus in a circle icon) Plan a new mesocycle, that was all on the top part stacked block display, next is at the bottom part stacked block display (question mark in a circle icon) Help, (person/profile in a circle icon) {*name}: Amaar Ali (^ icon) to the right of name

Current Day Tab Page: The Current day tab on the sidebar(left side) takes you to the nested page inside /mesocycles (the mesocycles page) with a randomly generated ID after like so: /mesocycles/0eolff1riu64/ with a /weeks after that and a /# which represents the week number like so: /mesocycles/0eolff1riu64/weeks/1 and a days/# too which represents the specific day.(current day). So the full url ends up being: baseURLname/mesocycles/0eolff1riu64/weeks/1/days/1 if it's the first day of that mesocycle/program. The page div displays multiple nested divs displayed in the center of the page, in a column-like structure, with multiple child divs stacked vertically. There is margins between each child div. The top nested div says the mesocycle name text inside the left side of the div and ... stacked vertically inside the right side of that div. Clicking the dots displays a small menu with mesocycle title text, new note, rename, end meso, delete meso div items, which all do what they say. There is another child div under that top child div with Week # Day # Day of the week on the top left, and a calendar icon on the top right with a ... to the right of that. Clicking the calendar will pop up a display menu with grid styling from the top row being each week of the mesocycle, the column under each being each day of the week. Clicking on the day of the week will bring you to that specific day instead, which takes you to a similar page with the exercises(specific training day) for that day. The ... will display a popup menu with Workout title and New Note, Rename, Add exercise, End workout cards which all do what it sounds like. The last thing in this child div are all of the muscle groups that are being trained in that day buttons(clicking the buttons with bring up a menu that asks for the biofeedback that effects the progessions of reps, weights, sets, in the upcoming weeks). The rest of the children divs in the column are each exercise in the program, with the muscle group(button) they belong to, exercise name, type of exercise they are, then 4 columns(probably grid styled) with set, weight, reps * # RIR (if a 5 week program, Week 1 is 3 RIR, week 2 is 2 RIR, week 3 is 1 RIR, week 4 is 0 RIR, and week 5 is 8 RIR. The second to last week is always 0 RIR, and the last week is always 8 RIR, so the length in weeks that you pick for your mesocycle affects your RIR targets, with them going from 9->0->1->2... going from last to first order. Under Set in the column: 1, 2, 3 for each set(which starts off each row). Under Weight in the column there is a select menu with a placeholder of ENTER with an upside down ^ which allows you to pick a number for the weight you used for that set. The next column under reps * # RIR there is ENTER with an upside down ^ again select menu which allows you to pick a number for the repititions you did in that set. In the last column(blank column title text next to REPS, at the right-most side of each row(set), there is a LOG SET button which is greyed out until you have selected a weight and reps. One you click the clickable log set button for a set(row), then you get the display menu associated with that exercise's muscle group(also accessible through the muscle group buttons on all the parts of the page they are present on). This is the bio-feedback menu which asks for a soreness rating for that muscle in the first line: you can select 4 different options that will have an effect on weight/reps/sets for the following weeks: Never got sore, Healed a while ago, Healed just on time, Im still sore. The next line asks for Joint pain rating for that exercise(not muscle! The joint pain is always related to the specific exercise, whereas the others are based on the muscle group it targets): you can select 4 options which will effect following weeks: none, low pain, moderate pain, a lot of pain. The next line asks for the pump in that muscle group: low pump, moderate pump, amazing pump. The last line asks for the workload for that muscle: easy, pretty good, pushed my limits, too much. There are also cancel and save buttons like with all the menus. The top right side of this div that corresponds to the specific exercise has a youtube play button icon, which probably takes you to the url link of the video on youtube that is listed in the Youtube video id part of the exercise when you created it, or in the premade exercise(probably one of the fields of the exercise document). Next to that play icon, there is a vertical ... icon which displays a menu with EXERCISE h2, and New note, add set, remove set, add down set, move up, move down, reset, replace, delete exercise div items that all do what they say. If you want more detail on exactly what each option does, even though it's pretty self-explanatory, I can definitely test it and tell you.

Mesocycles Page: Mesocycles(left side) and button that says "+ New"(right side). The + New button takes you to the Plan a new mesocycle Page. All mesocycles/programs previously ran(including the current one at top of list) Each program div card is clickable to go into that program and see your data from that program. It starts you off on the Day 1 Week 1 of that program's page. If you click the top div card, which is your current mesocycle, it takes you to the Current Day Tab Page. Each div card has the program name, # Weeks - # Days/Week, a checkmark icon if a previous mesocycle(which shows the date it was completed when hovered over the icon), there is also a three vertically stacked dots icon at the right side of each div card, which displays a popup menu when clicked with the title text of Mesocycle, and three options called New note, Rename, Delete meso (all do what they say: New notes brings up a display to create a note for the mesocycle, rename let's you change the name, and delete will delete that meso).

Custom exercises Page: Custom exercises title on top left, + New button on top right When + New button is clicked, a pop-up menu is displayed which an Exercise title, name label for an input field to type it, exercise type label for a select menu with placeholder of Choose exercuse type, an option input field with label of Youtube video id, another select meny with label of Muscle group and placeholder of Choose muscle group. There is also a cancel and a Save button on the bottom left of the display menu. The save button is grayed out until the name and two selection menus are completed. A list of div cards which are the Names of each custom exercise, the muscle group they belong to, and the exercise type they belong to(like machine, barbell, dumbbell, etc.)

Plan a new mesocycle Page: Plan a mesocycle Choose from a hand-crafted preset that you can modify to your liking or design your own from the ground up 3 tabs(spans) : Choose a preset, Create custom, Copy previous (each one changes the display menu display underneath (not really a pop-up) Choose a preset: Preset meso What is your sex? Male and Female options(buttons) that light up when clicked to indicate with one is selected What day of the week will you begin your meso? (Select menu) Options for each day of the week Preset (Select menu) Options for different weekly training frequencies and options for muscle splits under each Continue (button) that is unclickable till you fill out the previous 3 questions Create custom: Custom meso If you know how to plan your own mesocycle, use this option to create a new meso from the ground up with a blank canvas. Continue (button) that is clickable since there is no pre-requisite quesitons to answer Copy previous: Copy meso Use a previous mesocycle as a template for your next one. We will use the structure from your final accumulation week but you're totally free to change things around as you see fit. Mesocycles (Select menu) Options for previously made mesocycles Each option changes the Div container right underneath p tag's text to # weeks - # Days/Week + Finished on date(Jul 4, 2023) under that Continue (button) that is clickable since the select menu already has the most recent meso(including current) pre-selected as the default option Clicking continue on any of the options will bring you to another page nested inside of the current page(the previous page with the three option was /new at the end of the base website url, and this nested page is /new/mesocycle at the end of the base website url. This page has <- Back on top left, a grayed out Create mesocycle on top right and a ... with a circle icon to the right of that. Clicking on the ... in a circle icon with pop up a small display menu right under it with 5 divs items: Autofill exercises(dice icon), clear exercises (x icon), create custom exercise(wrench icon), copy previous meso(two squares domino stacked), add a day(calendar icon). Each of those options will do that it says on the page. The rest of the page has 2 columns with no label placeholder in a select menu(the menu options are each day of the week), there is another less complete 3rd column which is the same sized div as the div with the No label select menu, but a dotted border and with the text + Add a day inside of the div. At the right side of the No label select menu, inside of the same div, there is a ... which is clickable and brings up a delete day (garbage bin icon) small display menu. Clicking + Add a day will move it to a newly icon on the top right, and a select menu with a placeholder of select exercise. The garbage icon will delete that added nested div with the muscle group name and select menu, but leave the parent div with the + add a muscle group button. The select exercise select menu will have the options of each of the exercises(both pre-made and custom).

Help Popup-Menu: *Top right: x icon to close menu How can I help you? ( question mark icon) Frequently asked questions ( text notification icon) I have a suggestion ( bug icon ) I have a problem ( customer service employee face icon ) I have a general question

Name with Settings Popup-Menu: Theme : dropdown-menu : dark+light options that change the webpage theme/coloring Profile : Takes you to the profile page Leave a review : Popup-Menu that lets you leave a star rating out of 5 stars and a text review, with a share button and a cancel button Sign out : Presumably, signs you out, maybe after a confirmation popup-menu, or maybe not.

Profile Page: Account Profile Name Amaar Ali (name) Email amaar5ali@gmail.com (email) Created Tue Aug 17 2021 (date app account was created) Manage subscription : Manage subscription Page

Manage subscription Page: Change plan Cancel subscription View payment historyp button. That nested div contains the label of the muscle group selected(ex. Chest) on it's top left, a garbage bin icon on the top right, and a select menu with a placeholder of select exercise. The garbage icon will delete that added nested div with the muscle group name and select menu, but leave the parent div with the + add a muscle group button. The select exercise select menu will have the options of each of the exercises(both pre-made and custom).

Help Popup-Menu: *Top right: x icon to close menu How can I help you? ( question mark icon) Frequently asked questions ( text notification icon) I have a suggestion ( bug icon ) I have a problem ( customer service employee face icon ) I have a general question

Name with Settings Popup-Menu: Theme : dropdown-menu : dark+light options that change the webpage theme/coloring Profile : Takes you to the profile page Leave a review : Popup-Menu that lets you leave a star rating out of 5 stars and a text review, with a share button and a cancel button Sign out : Presumably, signs you out, maybe after a confirmation popup-menu, or maybe not.

Profile Page: Account Profile Name Amaar Ali (name) Email amaar5ali@gmail.com (email) Created Tue Aug 17 2021 (date app account was created) Manage subscription : Manage subscription Page

Manage subscription Page: Change plan Cancel subscription View payment history

Creating a mesocycle:
In the mesocycles tab in the navbar/sidebar:
-You click "New"
-You come to plan a meso page, with preset, custom, copy tabs
-You pick one option, fill out any info if required, then click continue
-I clicked Custom, for simplicity of seeing the layout without any external additions(the smallest/simplest weekly template to start off before you start editing it)
-You are now on a weekly layout page where you need a minimum of 2 training days(2 workouts total)
-At the top of each column, you have a select menu where you pick the day of the week that workout is on
-Under that, you have an add a muscle group option that you can click to add a muscle group specific exercise entry inside of that day. This entry has that muscle group name label with another select menu under it that has the options of all of the exercises that have belong to that muscle group. This is how you add a specific exercise to that day/workout.
-The add a muscle group option from before is also pushed down after that first muscle group you selected's menu is added. Therefore, you can pick another muscle group, or the same muscle group if you want another exercise for targeting that muscle group.
-Then you just repeat this until you have all of the muscle groups you want to target in that workout/day, and all of the exercises for each of those muscle groups that you want to perform in that workout/day.
-You do the same for the second day/column for the weekly layout.
-If you want more than just 2 workouts/days a week, which you probably do(since that is typically a very low frequency for something like hypertrophy training), you can click a Add a day button that is currently on the top of the third column.
-Clicking it will push Add a day button to the 4th column/next column, and will create an identical column to the previous 2 if you had not added any muscle groups and exercises for them yet. It will just be a label select menu to choose the day of the week for that workout, and the add a muscle group button underneath that to repeat the process we did in the first two days/workout/columns.
-After you have fully created your workouts for each day of the week that you plan on training on, you can click the Create button on the top right of these columns, or if you want to not go through with this creation or edit anymore, you can click the Back button on the top left side of the columns to bring you back to the plan a mesocycle page with the 3 options.
-Once you click create, your program/mesocycle will be displayed inside the mesocycles tab, on a card that displays the name of it, the amount of weeks(microcycles) it consists of, and how many days a week you are training in it. Clicking on it will either take you to the current day tab in the sidebar/navbar if you are currently running it, or it will take you to the mesocycle page which probably displays all the data, in a daily/workout view(this is probably fetched from Firebase database). Creating the mesocycle from the previous steps probably stored the data to Firebase database. And if it's a prior mesocycle that you have already edited weight/sets and biofeedback on by running it and filling out that information on the current day page as you went through it, that data would presumably also have been pushed to Firebase inside of that mesocycle, in it's individual workouts/days. This other info is editable by the way, even if you're viewing a prior mesocycle.

you:
Let's start by looking at the design file you've provided to understand the structure and functionality of your app. Once we have a good grasp on your design, we can then look at your current code and discuss the problems you're facing and the next steps to take.

1. Current Day Tab Page: The page displays the user's current training day. It includes a detailed breakdown of all exercises in the user's program for that day, along with options to log sets and provide biofeedback that affects progression in upcoming weeks.

2. Mesocycles Page: This page displays all the user's training programs (mesocycles), including previous and current ones. From here, users can create a new mesocycle or view the detailed breakdown of existing ones.

3. Custom Exercises Page: Users can create custom exercises on this page, which they can later add to their training programs.

4. Plan a New Mesocycle Page: Users can create a new training program from scratch, choose from presets, or copy a previous program.

5. Help Popup-Menu: Contains FAQs and options for users to report issues or make suggestions.

6. Name with Settings Popup-Menu: Allows users to switch between light and dark themes, view their profile, leave a review, or sign out.

7. Profile Page: Displays user's account details and provides an option to manage subscriptions.

8. Manage Subscription Page: Allows users to change or cancel their subscription and view their payment history.

Given the functionalities you've listed and the technologies you're using (React, Firebase, Jest, CSS Modules), I can see that you're building a comprehensive app with user authentication, database operations, complex state management, and dynamic rendering of components.

me:
Let me further address the 8 different parts of the app that you determined, and what my modifications for my simpler version product would be, that I would like to finish first, and then expand upon later, for a more iterative process, instead of getting stuck on a functionality or problem that might be circumvented while still making a fantastic fully functioning app.

you:
Absolutely, I understand the need to simplify the app for an initial version, focusing on the core functionality. Here is a revised outline of the app based on your feedback:

1. Current Day Tab Page: The user is navigated to this page upon opening the app, provided they are already signed in. It displays the day of the week that the user is currently on, based on their chosen training days and the total number of weeks in their mesocycle. It includes a detailed breakdown of all exercises in the user's program for that day, along with options to log sets. A "Complete Workout" button moves the user to the next day in the Mesocycle. The app does not use real-time date fetching, and biofeedback functionality is omitted for now.

2. Mesocycles Page: This page displays all the user's training programs (mesocycles), including previous and current ones. From here, users can create a new mesocycle. Viewing the detailed breakdown of existing mesocycles is also possible.

3. Custom Exercises Page: While not a priority for the initial version of the app, this page would allow users to create custom exercises, which they can later add to their training programs. For now, a built-in globalExercises collection in Firestore will be used.

4. Plan a New Mesocycle Page: Users can create a new training program from scratch. Once the total number of weeks is selected, the user is taken to a weekly display where they can add training days and exercises for each day. For now, choosing from presets or copying a previous program is not included.

5. Help Popup-Menu: Omitted in the initial version of the app.

6. Name with Settings Popup-Menu: A simplified version of this menu will include only the user's name and a sign out button.

7. Profile Page: Omitted in the initial version of the app.

8. Manage Subscription Page: Omitted entirely, as monetization is not planned for the foreseeable future.

In addition, certain non-essential features like exercise type and YouTube video IDs are also omitted for now. The focus will be on creating a functioning app with an ideal UI, and "extra" features can be added later on.
In the next phase, I would recommend focusing on the pages and features we've retained
------------------------------
Now, here are all of my current components(WorkoutForm is probably temporary, since it's just a placeholder page that won't be there at the end of the project, but contains a ton of context and code for us to reference from):

// App.js : the component that handles the firebase user auth to handle access and routing based on user login
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { auth } from "./Firebase";
import WorkoutForm from "./WorkoutForm";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { useAuthState } from "react-firebase-hooks/auth";

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={user ? <Navigate to="/workout" /> : <SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/workout" element={user ? <WorkoutForm /> : <Navigate to="/signin" />} />
        <Route path="/*" element={<Navigate to="/signin" />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;

// CreateMeso.js : the component responsible for the first "final product" page that we wanted to work on. It is the display that allows the user to create their own mesocycles and save them to their firebase database to be fetched later in other "final product" pages.

import React, { useState } from "react";
import DayColumn from "./DayColumn";
import SaveMeso from "./SaveMeso";
import styles from "./CreateMeso.module.css"

const CreateMeso = () => {
    const [meso, setMeso] = useState({
        name: "",
        weeks: "",
        days: [] // This will be an array of Day objects. Each Day object will include the day of the week and an array of Exercises.
    });

    const addDay = () => {
        setMeso(prevMeso => ({ ...prevMeso, days: [...prevMeso.days, { dayOfWeek: "", exercises: [] }] }));
    };

    const deleteDay = (dayOfWeek) => {
        setMeso(prevMeso => ({ ...prevMeso, days: prevMeso.days.filter(day => day.dayOfWeek !== dayOfWeek) }));
    };

    const setMuscleGroup = (dayIndex, exerciseIndex, muscleGroup) => {
        setMeso(prevMeso => {
            const newDays = [...prevMeso.days];
            newDays[dayIndex].exercises[exerciseIndex].muscleGroup = muscleGroup;
            return { ...prevMeso, days: newDays };
        });
    };

    const setExerciseName = (dayIndex, exerciseIndex, exerciseName) => {
        setMeso(prevMeso => {
            const newDays = [...prevMeso.days];
            newDays[dayIndex].exercises[exerciseIndex].name = exerciseName;
            return { ...prevMeso, days: newDays };
        });
    };

    const addExercise = (dayIndex) => {
        setMeso(prevMeso => {
            const newDays = [...prevMeso.days];
            newDays[dayIndex].exercises.push({ muscleGroup: "", name: "" });
            return { ...prevMeso, days: newDays };
        });
    };

    // TODO: Implement function to save/create the meso

    return (
        <div className={styles.CreateMeso}>
            {meso.days.map((day, index) => (
                <DayColumn
                    key={index}
                    day={day}
                    deleteDay={deleteDay}
                    setMuscleGroup={(exerciseIndex, muscleGroup) => setMuscleGroup(index, exerciseIndex, muscleGroup)}
                    setExerciseName={(exerciseIndex, exerciseName) => setExerciseName(index, exerciseIndex, exerciseName)}
                    addExercise={() => addExercise(index)}
                />
            ))};
            <button onClick={addDay}>+ Add a Day</button>
            <SaveMeso
                meso={meso}
                setMeso={setMeso}
                // TODO: Pass a function as a prop to handle saving the meso
            />
        </div>
    );
};

export default CreateMeso;

// DayColumn.js : Part of the CreateMeso page.
import React from "react";
import MuscleGroupForm from "./MuscleGroupForm";
import ExerciseForm from "./ExerciseForm";
import styles from "./DayColumn.module.css";

const DayColumn = ({ day, deleteDay, setMuscleGroup, setExerciseName, addExercise }) => {
    
    const handleDayChange = (event) => {
        day.dayOfWeek = event.target.value;
    }

    const handleDelete = () => {
        deleteDay(day.dayOfWeek);
    }

    return (
        <div className={styles.DayColumn}>
            <label>
                Day of the week:
                <select value={day.dayOfWeek} onChange={handleDayChange}>
                    <option value="">Select a day</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                </select>
            </label>
            <button onClick={handleDelete}>Delete Day</button>
            {day.exercises.map((exercise, index) => (
                <div key={index}>
                    <MuscleGroupForm
                        muscleGroup={exercise.muscleGroup}
                        setMuscleGroup={(muscleGroup) => setMuscleGroup(index, muscleGroup)}
                        exerciseName={exercise.name}
                        setExerciseName={(exerciseName) => setExerciseName(index, exerciseName)}
                        addExercise={() => addExercise(index)}
                    />
                    <ExerciseForm
                        exerciseName={exercise.name}
                        setExerciseName={(exerciseName) => setExerciseName(index, exerciseName)}
                    />
                    <button onClick={() => addExercise(index)}>+ Add a muscle group</button>
                </div>
            ))};
        </div>
    );
};

export default DayColumn;

// SaveMeso.js: part of the CreateMeso page
import React from "react";
import styles from "./SaveMeso.module.css";

const SaveMeso = ({ meso, setMeso, /* TODO: Add a prop for the function to save the mesocycle */ }) => {
    // TODO: Implement the form and the function to handle form submission.
    return (
        <div className={styles.SaveMeso}>
            {/* Render the form. */}
        </div>
    );
};

export default SaveMeso;

// DayForm.js: child component of the temporary WorkoutForm page
import React from "react";
import styles from "./DayForm.module.css"

const DayForm = ({ dayOfWeek, setDayOfWeek }) => {
    return (
        <div className={styles.DayForm}>
            <label className={styles.DayOfWeekLabel}>
                Day of the week:
                <select
                    value={dayOfWeek}
                    onChange={(event) => setDayOfWeek(event.target.value)} required>
                    <option value="">Select a day</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                </select>
            </label>
        </div>
    )
}

export default DayForm;

// ExerciseForm.js: child component of the temporary WorkoutForm page but also includes integration with Firebase and is used in the final components too.
import React, { useEffect, useState } from "react";
import styles from "./ExerciseForm.module.css";
import { db } from './Firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { collection, getDocs } from "firebase/firestore";

const ExerciseForm = ({ exerciseName, setExerciseName, muscleGroup }) => {
    const [exercises, setExercises] = useState([]);
    const [user] = useAuthState(auth);
    const userId = user ? user.uid : null;

    useEffect(() => {
        // Fetch exercise options from Firestore when the component mounts
        const fetchExercises = async () => {
            const globalExercisesCollection = await getDocs(collection(db, 'globalExercises'));
            const globalExercises = globalExercisesCollection.docs.map(doc => ({
                name: doc.data().exerciseName,
                muscleGroup: doc.data().muscleGroup
            }));

            let userExercises = [];
            if (userId) {
                const userExercisesCollection = await getDocs(collection(db, 'users', userId, 'exercises'));
                userExercises = userExercisesCollection.docs.map(doc => ({
                    name: doc.data().exerciseName,
                    muscleGroup: doc.data().muscleGroup
                }));
            }

            setExercises([...globalExercises, ...userExercises]);
        };

        fetchExercises();
    }, [userId]);

    // Filter exercises based on the selected muscle group
    const filteredExercises = exercises.filter(exercise => exercise.muscleGroup === muscleGroup);

    const handleExerciseChange = (event) => {
        const selectedExercise = filteredExercises.find(exercise => exercise.name === event.target.value);
        setExerciseName(selectedExercise.name);
    };

    return (
        <div className={styles.ExerciseForm}>
            <h2 className={styles.ExerciseNameLabel}>
                Exercise Name:
            </h2>
            <select value={exerciseName} onChange={handleExerciseChange}>
                <option value="">Select an exercise</option>
                {filteredExercises.map(exercise => (
                    <option key={exercise.name} value={exercise.name}>{exercise.name}</option>
                ))}
            </select>
        </div>
    )
}

export default ExerciseForm;

// Firebase.js: initialization
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};  

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

// FirebaseFunctions.js: integrates Firebase with app too
import { db } from './Firebase';
import { collection, doc, addDoc, getDocs } from "firebase/firestore";

export const addMesocycle = async (userId, mesocycle) => {
    try {
        const docRef = await addDoc(collection(doc(db, 'users', userId), 'mesocycles'), mesocycle);
        console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

export const getMesocycles = async (userId) => {
    const mesocyclesRef = collection(doc(db, 'users', userId), 'mesocycles');
    const mesocyclesSnap = await getDocs(mesocyclesRef);

    const mesocycles = mesocyclesSnap.docs.map(doc => doc.data());
    return mesocycles;
}

// MesocycleForm.js: child component of temp WorkoutForm component
import React from "react";
import styles from "./MesocycleForm.module.css";

const MesocycleForm = ({ mesoLength, setMesoLength, daysPerWeek, setDaysPerWeek }) => {
    return (
        <div className={styles.MesocycleForm}>
            <label className={styles.MesoLengthLabel}>
                How many weeks do you want your mesocycle to last?
                <select
                    value={mesoLength}
                    onChange={(event) => setMesoLength(event.target.value)} required>
                    <option value="">Select a meso length</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </label>
            <label className={styles.DaysPerWeekLabel}>
                How many days a week do you want to train?
                <select
                    value={daysPerWeek}
                    onChange={(event) => setDaysPerWeek(event.target.value)} required>
                    <option value="">Select training frequency</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </label>
        </div>
    )
}

export default MesocycleForm;

// MuscleGroupForm.js: child component of the temporary WorkoutForm page but also includes integration with Firebase and is used in the final components too.
import React, { useEffect, useState } from "react";
import styles from "./MuscleGroupForm.module.css";
import { db } from './Firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { collection, getDocs } from "firebase/firestore";

const MuscleGroupForm = ({ muscleGroup, setMuscleGroup, exerciseName, setExerciseName, addExercise }) => {
    const [exercises, setExercises] = useState([]);
    const [user] = useAuthState(auth);
    const userId = user ? user.uid : null;

    useEffect(() => {
        // Fetch exercise options from Firestore when the component mounts
        const fetchExercises = async () => {
            const globalExercisesCollection = await getDocs(collection(db, 'globalExercises'));
            const globalExercises = globalExercisesCollection.docs.map(doc => ({
                name: doc.data().exerciseName,
                muscleGroup: doc.data().muscleGroup
            }));

            let userExercises = [];
            if (userId) {
                const userExercisesCollection = await getDocs(collection(db, 'users', userId, 'exercises'));
                userExercises = userExercisesCollection.docs.map(doc => ({
                    name: doc.data().exerciseName,
                    muscleGroup: doc.data().muscleGroup
                }));
            }

            setExercises([...globalExercises, ...userExercises]);
        };

        fetchExercises();
    }, [userId]);

    // Filter exercises based on the selected muscle group
    const filteredExercises = exercises.filter(exercise => exercise.muscleGroup === muscleGroup);

    const handleExerciseNameChange = (event) => {
        const selectedExercise = filteredExercises.find(exercise => exercise.name === event.target.value);
        setExerciseName(selectedExercise.name);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addExercise(muscleGroup, exerciseName);
        setMuscleGroup("");
        setExerciseName("");
    }
    
    return (
        <form className={styles.MuscleGroupForm} onSubmit={handleSubmit}>
            <label className={styles.MuscleGroupLabel}>
                Muscle group:
                <select
                    value={muscleGroup}
                    onChange={(event) => setMuscleGroup(event.target.value)} required>
                    <option value="">Select a muscle group</option>
                    <option value="Chest">Chest</option>
                    <option value="Back">Back</option>
                    <option value="Triceps">Triceps</option>
                    <option value="Biceps">Biceps</option>
                    <option value="Side Delts">Side Delts</option>
                    <option value="Rear Delts">Rear Delts</option>
                    <option value="Front Delts">Front Delts</option>
                    <option value="Quads">Quads</option>
                    <option value="Hamstrings">Hamstrings</option>
                    <option value="Glutes">Glutes</option>
                    <option value="Calves">Calves</option>
                    <option value="Traps">Traps</option>
                    <option value="Forearms">Forearms</option>
                    <option value="Abs">Abs</option>
                    <option value="Other">Other</option>
                </select>
            </label>
            <label className={styles.ExerciseNameLabel}>
                Exercise name:
                <select
                    value={exerciseName}
                    onChange={handleExerciseNameChange} required>
                    <option value="">Select an exercise</option>
                    {filteredExercises.map(exercise => (
                        <option key={exercise.name} value={exercise.name}>{exercise.name}</option>
                    ))}
                </select>
            </label>
            <button type="submit">Add Exercise</button>
        </form>
    )
}

export default MuscleGroupForm;

// SessionForm.js: child component of temp WorkoutForm but might be useful for future "final product" pages because it includes intra-workout variables like weight, sets, reps, rir, all of which would be managed in two other final pages we have yet to create.(the current day page, and the day page for each day within the mesocycles browsing page.
import React, { useState } from "react";
import styles from "./SessionForm.module.css"

const SessionForm = ({ exerciseName, rirTarget }) => {
    const [sets, setSets] = useState([{ weight: "", reps: "" }]);
    const [error, setError] = useState("");

    const handleAddSet = () => {
        if (sets.length >= 7) {
            setError("No more sets for this exercise. Add another exercise for the same muscle.");
        } else {
            setSets([...sets, { weight: "", reps: "" }]);
            setError("");
        }
    };

    const handleRemoveSet = () => {
        if (sets.length <= 1) {
            setError("Each exercise must contain at least 1 set. Delete the exercise instead.");
        } else {
            setSets(sets.slice(0, -1));
            setError("");
        }
    };

    const handleWeightChange = (index, weight) => {
        const newSets = [...sets];
        newSets[index].weight = weight;
        setSets(newSets);
    };

    const handleRepsChange = (index, reps) => {
        const newSets = [...sets];
        newSets[index].reps = reps;
        setSets(newSets);
    };

    return (
        <div className={styles.SessionForm}>
            <h2 className={styles.ExerciseNameLabel}>
                {exerciseName}
            </h2>
            {sets.map((set, index) => (
                <div key={index}>
                    <label className={styles.SetsLabel}>
                        Set {index + 1}:
                    </label>
                    <label className={styles.WeightLabel}>
                        The weight used(lbs):
                        <input
                            type="number" min="0"
                            value={set.weight}
                            onChange={(event) => handleWeightChange(index, event.target.value)}
                            placeholder="#"
                            required
                        />
                    </label>
                    <label className={styles.RepsLabel}>
                        The repititions performed:
                        <input
                            type="number" min="0"
                            value={set.reps}
                            onChange={(event) => handleRepsChange(index, event.target.value)}
                            placeholder="#"
                            required
                        />
                    </label>
                </div>
            ))}
            <button type="button" onClick={handleAddSet}>Add Set</button>
            <button type="button" onClick={handleRemoveSet}>Remove Set</button>
            {error && <p>{error}</p>}
            <label className={styles.RirLabel}>
                Reps in reserve:
                <input
                    type="number" min="0"
                    value={rirTarget}
                    readOnly
                />
            </label>
        </div>
    )
}

export default SessionForm;

// SignInForm.js: part of the final app product, the sign in page
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase";
import { Link } from "react-router-dom";
import styles from "./SignInForm.module.css"

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Welcome to the Hypertrophy App!</h1>
            <p>This app is for anyone wanting to maximize their muscle building potential</p>
            <h2>Sign in Page</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    className={styles.input}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    className={styles.input}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button className={styles.button} type="submit">Sign In</button>
                <Link className={styles.link} to="/signup">Create an account</Link>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default SignInForm;

// SignUpForm.js: part of the final product, the sign up page
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase";
import { Link } from "react-router-dom";
import styles from "./SignUpForm.module.css"

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Welcome to the Hypertrophy App!</h1>
            <p>This app is for anyone wanting to maximize their muscle building potential</p>
            <h2>Sign up Page</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    className={styles.input}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    className={styles.input}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button className={styles.button} type="submit">Sign Up</button>
                <Link className={styles.link} to="/signin">Sign In with your account</Link>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default SignUpForm;

WorkoutForm.js: the parent component/temp page for a lot of the current components and includes a ton of code, and also has integration with firebase. This will eventually not be needed because it isn't a page we are looking to include in the final app product
import React, { useEffect, useState } from "react";
import styles from "./WorkoutForm.module.css"
import MesocycleForm from "./MesocycleForm";
import DayForm from "./DayForm";
import MuscleGroupForm from "./MuscleGroupForm";
import ExerciseForm from "./ExerciseForm";
import SessionForm from "./SessionForm";
import { addMesocycle } from "./FirebaseFunctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { signOut } from "firebase/auth";

const WorkoutForm = () => {
    const [mesoLength, setMesoLength] = useState("");
    const [daysPerWeek, setDaysPerWeek] = useState("");
    const [dayOfWeek, setDayOfWeek] = useState("");
    const [muscleGroup, setMuscleGroup] = useState("");
    const [exerciseName, setExerciseName] = useState("");
    const [sets, setSets] = useState("");
    const [weight, setWeight] = useState("");
    const [reps, setReps] = useState("");
    const [rirTarget, setRirTarget] = useState("");
    const [currentWeek, setCurrentWeek] = useState(1);
    const [currentDay, setCurrentDay] = useState(1);
    const [days, setDays] = useState([]);
    const [user] = useAuthState(auth);
    const userId = user ? user.uid : null;
    const [exercises] = useState([]);

    useEffect(() => {
        // Calculate rirTarget based on currentWeek and mesoLength
        const calculateRirTarget = (currentWeek, mesoLength) => {
            if (currentWeek === mesoLength) {
                // Last week of meso, deload
                return 8;
            } else {
                // Other weeks of meso
                return mesoLength - currentWeek - 1;
            }
        }

        setRirTarget(calculateRirTarget(currentWeek, mesoLength));
    }, [currentWeek, mesoLength]);

    const addExercise = (muscleGroup, exerciseName) => {
        setDays(prevDays => {
            // Find the current day in the days array
            const dayIndex = prevDays.findIndex(day => day.dayOfWeek === dayOfWeek);
            if (dayIndex === -1) {
                // If the current day is not in the days array, add it
                return [...prevDays, {
                    dayOfWeek,
                    muscleGroups: [{
                        muscleGroup,
                        exercises: [{
                            exerciseName,
                            sets: null,
                            reps: null,
                            weight: null,
                            rirTarget: null,
                        }]
                    }]
                }];
            } else {
                // If the current day is in the days array, update it
                const newDays = [...prevDays];
                const day = newDays[dayIndex];
                const muscleGroupIndex = day.muscleGroups.findIndex(mg => mg.muscleGroup === muscleGroup);
                if (muscleGroupIndex === -1) {
                    // If the muscle group is not in the muscleGroups array, add it
                    day.muscleGroups.push({
                        muscleGroup,
                        exercises: [{
                            exerciseName,
                            sets: null,
                            reps: null,
                            weight: null,
                            rirTarget: null,
                        }]
                    });
                } else {
                    // If the muscle group is in the muscleGroups array, update it
                    const exercise = {
                        exerciseName,
                        sets: null,
                        reps: null,
                        weight: null,
                        rirTarget: null,
                    };
                    day.muscleGroups[muscleGroupIndex].exercises.push(exercise);
                }
                return newDays;
            }
        });
    };
    
    const handleWorkoutCompletion = () => {
        // Increment currentDay
        setCurrentDay(currentDay + 1);

        // If currentDay exceeds daysPerWeek, reset currentDay and increment currentWeek
        if (currentDay >= daysPerWeek) {
            setCurrentDay(1);
            setCurrentWeek(currentWeek + 1);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (userId === null) {
            alert("Please sign in to create a mesocycle.");
            return;
        }
    
        // Prepare the mesocycle data
        const mesocycle = {
            mesoLength,
            daysPerWeek,
            days: days.reduce((acc, day) => {
                acc[day.dayOfWeek] = {
                    muscleGroups: day.muscleGroups.reduce((acc, muscleGroup) => {
                        acc[muscleGroup.muscleGroup] = {
                            exercises: muscleGroup.exercises.reduce((acc, exercise) => {
                                acc[exercise.exerciseName] = {
                                    sets: exercise.sets,
                                    reps: exercise.reps,
                                    weight: exercise.weight,
                                    rirTarget: exercise.rirTarget,
                                };
                                return acc;
                            }, {})
                        };
                        return acc;
                    }, {})
                };
                return acc;
            }, {})
        };
    
        // Submit meso data to Firebase
        addMesocycle(userId, mesocycle);
    
        // Clear the form fields
        setMesoLength("");
        setDaysPerWeek("");
        setDayOfWeek("");
        setMuscleGroup("");
        setExerciseName("");
        setSets("");
        setReps("");
        setWeight("");
        setRirTarget("");
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    return (
        <form className={styles.WorkoutForm} onSubmit={handleSubmit}>
            <MesocycleForm mesoLength={mesoLength} setMesoLength={setMesoLength} daysPerWeek={daysPerWeek} setDaysPerWeek={setDaysPerWeek} />
            <DayForm dayofWeek={dayOfWeek} setDayOfWeek={setDayOfWeek} />
            <MuscleGroupForm muscleGroup={muscleGroup} setMuscleGroup={setMuscleGroup} exerciseName={exerciseName} setExerciseName={setExerciseName} addExercise={addExercise} exercises={exercises} />
            <ExerciseForm exerciseName={exerciseName} muscleGroup={muscleGroup} />
            <SessionForm exerciseName={exerciseName} sets={sets} setSets={setSets} weight={weight} setWeight={setWeight} reps={reps} setReps={setReps} rirTarget={rirTarget} setRirTarget={setRirTarget} />
            <button type="button" onClick={handleWorkoutCompletion}>Complete Workout</button>
            <button type="submit">Create Mesocycle</button>
            <button type="button" onClick={handleSignOut}>Sign Out</button>
        </form>
    );
}

export default WorkoutForm;