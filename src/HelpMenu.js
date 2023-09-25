import React, { useState } from 'react';
import styles from './HelpMenu.module.css';

const HelpMenu = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('Run Mesocycle');

    return (
        <div className={styles.HelpMenu}>
            <div className={styles.TabMenu}>
                <button className={styles.Tabs} onClick={() => setActiveTab('Run Mesocycle')}>Run Mesocycle</button>
                <button className={styles.Tabs} onClick={() => setActiveTab('Create Mesocycle')}>Create Mesocycle</button>
                <button className={styles.Tabs} onClick={() => setActiveTab('Your Mesocycles')}>Your Mesocycles</button>
            </div>
            <div className={styles.TabContent}>
                {activeTab === 'Run Mesocycle' &&
                    <div className={styles.Instructions}>
                        <strong>For working out!</strong>
                        <ul>
                            <li className={styles.ListItem}>Go to the day using the calendar</li>
                            <li className={styles.Subnotes}><em>The days will be red if incomplete</em></li>
                            <li className={styles.Subnotes}><em>The days will be green if completed</em></li>
                            <li className={styles.ListItem}>Here you'll see the training routine</li>
                            <li className={styles.Subnotes}><em>You chose these exercises</em></li>
                            <li className={styles.ListItem}>Fill out the weight and reps</li>
                            <li className={styles.ListItem}>You can add and remove sets too</li>
                            <li className={styles.ListItem}>Log your sets!</li>
                            <li className={styles.ListItem}>Once all your sets are logged, the day is completed</li>
                            <li className={styles.ListItem}>You can end your mesocycle early but <strong>you can't undo this</strong></li>
                            <li className={styles.Subnotes}><em>Only do this if you are sure you want to discontinue this program</em></li>
                            <li className={styles.ListItem}>You will also be given suggestions of weight and reps for progressive overload in consecutive weeks!</li>
                        </ul>
                    </div>}
                {activeTab === 'Create Mesocycle' &&
                    <div className={styles.Instructions}>
                        <strong>For creating a program!</strong>
                        <ul>
                            <li className={styles.ListItem}>You give your program a name at the top</li>
                            <li className={styles.ListItem}>You also decide the length of your program</li>
                            <li className={styles.Subnotes}><em>3-6 weeks recommended!</em></li>
                            <li className={styles.ListItem}>Click the Add Day button</li>
                            <li className={styles.Subnotes}><em>This represents a training day of the week</em></li>
                            <li className={styles.ListItem}>To the right of it, add another training day</li>
                            <li className={styles.Subnotes}><em>3-6 days recommended!</em></li>
                            <li className={styles.ListItem}>Choose your desired muscles you want to train</li>
                            <li className={styles.ListItem}>Then pick the exercise from the list</li>
                            <li className={styles.ListItem}>Click the Add Another Muscle for another muscle group and exercise</li>
                            <li className={styles.Subnotes}><em>You can do the same muscle again</em></li>
                            <li className={styles.ListItem}>You can delete days if you want to discard that day</li>
                            <li className={styles.ListItem}>When you are satisfied, click the Save Mesocycle button</li>
                            <li className={styles.Subnotes}><em>You will be unable to save if you haven't filled out everything!</em></li>
                        </ul>
                    </div>}
                {activeTab === 'Your Mesocycles' &&
                    <div className={styles.Instructions}>
                        <strong>Viewing your programs!</strong>
                        <ul>
                            <li className={styles.ListItem}>You'll see a list of all of your mesos</li>
                            <li className={styles.Subnotes}><em>The completed mesocycles have checkmarks</em></li>
                            <li className={styles.ListItem}>You can add a note to any of them</li>
                            <li className={styles.Subnotes}><em>Remember to save it!</em></li>
                            <li className={styles.ListItem}>You can filter through them by name in the search bar</li>
                            <li className={styles.ListItem}>You can also use the dropdown menu to sort by specified option</li>
                            <li className={styles.ListItem}>If you want a more detailed view, click the view details button</li>
                            <li className={styles.ListItem}>You can also delete a meso but <strong>you can't undo this</strong></li>
                            <li className={styles.Subnotes}><em>Only do this if you are sure you want to discontinue this program</em></li>
                        </ul>
                    </div>}
            </div>
            <button className={styles.Close} onClick={onClose}>Got it</button>
        </div>
    );
}

export default HelpMenu;