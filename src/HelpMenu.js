import React, { useState } from 'react';
import styles from './HelpMenu.module.css';

const HelpMenu = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('Run Mesocycle');

    return (
        <div className={styles.Overlay} onClick={onClose}>
            <div className={styles.HelpMenu} onClick={(e) => e.stopPropagation()}>
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
                                <li className={styles.ListItem}><strong>Navigate</strong> to the day using the calendar</li>
                                <li className={styles.ListItem}>Here you'll see the training routine</li>
                                <li className={styles.ListItem}><strong>Fill out</strong> the weight and reps</li>
                                <li className={styles.ListItem}>You can add and remove sets too</li>
                                <li className={styles.ListItem}><strong>Log</strong> your sets!</li>
                                <li className={styles.ListItem}>Once all your sets are logged, the day is completed</li>
                                <li className={styles.ListItem}>You can end your mesocycle early but <strong>you can't undo this</strong></li>
                                <li className={styles.Subnotes}><em>Only do this if you are sure you want to discontinue this program</em></li>
                                <li className={styles.ListItem}>You will also be given suggestions of weight and reps for <strong>progressing</strong> in following weeks!</li>
                            </ul>
                        </div>
                    }
                    {activeTab === 'Create Mesocycle' &&
                        <div className={styles.Instructions}>
                            <strong>For creating a program!</strong>
                            <ul>
                                <li className={styles.ListItem}><strong>Name</strong> your program at the top</li>
                                <li className={styles.ListItem}>Choose <strong>length</strong> next to it</li>
                                <li className={styles.Subnotes}><em>4-6 weeks!</em></li>
                                <li className={styles.ListItem}>You can <strong>add and delete days</strong></li>
                                <li className={styles.Subnotes}><em>3-6 days recommended!</em></li>
                                <li className={styles.ListItem}>Pick the <strong>muscle group & exercise</strong></li>
                                <li className={styles.ListItem}>You can <strong>add and delete exercises</strong></li>
                                <li className={styles.Subnotes}><em>3-10 recommended!</em></li>
                                <li className={styles.ListItem}>Done? <strong>Save</strong> the mesocycle</li>
                                <li className={styles.Subnotes}><em>You will be unable to save if you haven't filled out everything!</em></li>
                            </ul>
                        </div>
                    }
                    {activeTab === 'Your Mesocycles' &&
                        <div className={styles.Instructions}>
                            <strong>Viewing your programs!</strong>
                            <ul>
                                <li className={styles.ListItem}>You'll see a <strong>list of your mesocycles</strong></li>
                                <li className={styles.Subnotes}><em>Completed mesocycles have checkmarks</em></li>
                                <li className={styles.ListItem}>You can <strong>add a note</strong> to any of them</li>
                                <li className={styles.Subnotes}><em>Remember to save it!</em></li>
                                <li className={styles.ListItem}>You can <strong>filter</strong> through them by name in the <strong>search bar</strong></li>
                                <li className={styles.ListItem}>You can also use the <strong>dropdown menu</strong> to <strong>sort</strong> by option</li>
                                <li className={styles.ListItem}>Click <strong>view details</strong> for more info</li>
                                <li className={styles.ListItem}>You can <strong>delete</strong> a mesocycle but you <strong>can't undo this</strong></li>
                                <li className={styles.Subnotes}><em>Only do this if you are sure you want to remove this program</em></li>
                            </ul>
                        </div>
                    }
                </div>
                <button className={styles.Close} onClick={onClose}>Got it</button>
            </div>
        </div>
    );
}

export default HelpMenu;