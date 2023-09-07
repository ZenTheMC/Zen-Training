    Update the SaveMeso component to create a 1D days array with unique exercises for each day. Each element in the days array should represent a unique day in the mesocycle, and should include the week, dayOfWeek, and exercises fields. The exercises field should be an array of objects, each representing an exercise, and including the name, muscleGroup, sets, weight, and reps fields. The sets, weight, and reps fields can be initialized with default values, such as an empty array, or null, or undefined.

    Update the FirebaseFunctions component to work with the updated days array structure. Remove any code that transforms the days array from 1D to 2D or vice versa.

    Update the CurrentDay component to work with the updated days array structure. Remove any code that transforms the days array from 1D to 2D or vice versa. Update the handleSelectDay, addSet, removeSet, handleSetChange, and logSet functions to update the mesocycle state and the Firestore document.

    Update the Calendar component to work with the updated days array structure. Compute the weeks and days props from the mesocycle.days state, which is now a 1D array.

    By making these changes, you can ensure that the days array structure is consistent across your entire app, and that the UI is always in sync with the mesocycle state and the Firestore document.

Creation adjustments:

    Adding Days:
        If your users are only training a maximum of 6 days a week, it makes sense to allow them to add days one at a time. However, you still need to make sure that each day added is unique in the mesocycle. For example, if the user adds two 'Monday's, they should be treated as separate days in the mesocycle, each with its own exercises, sets, weights, and reps. This might require updating the handleDayChange function to ensure that the days array is updated correctly.

    Selecting Exercises:
        It makes sense to allow the user to select exercises for a single day of the week and then replicate those exercises across all the weeks in the mesocycle. However, you still need to make sure that each week in the mesocycle can have its own unique sets, weights, and reps for each exercise. This might require updating the SaveMeso component to create a unique set of exercises for each day of each week, rather than replicating the same exercises across all the weeks.

    Unique Exercises:
        You can create a unique exercise object for each week in the mesocycle by updating the SaveMeso component. Instead of replicating the same exercises across all the weeks, you can create a new exercise object for each week, even if the name and muscleGroup are the same. This will allow each week to have its own unique sets, weights, and reps for each exercise.

    Sets, Weights, and Reps:
        The sets, weights, and reps fields should be part of the mesocycle data, not the global exercises data. This is because the sets, weights, and reps can vary for each user and each mesocycle. You can add these fields to the mesocycle data in the SaveMeso component when the user saves the mesocycle.

    Firebase Functions:
        You can update the addMesocycle function in the FirebaseFunctions component to add the sets, weights, and reps fields to the mesocycle data. You can also add a updateMesocycle function to update the mesocycle data when the user adds or updates exercises, sets, weights, or reps.