import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native';
import { MyUserContext } from '../../App';
import DateTimePicker from '@react-native-community/datetimepicker';
import { windowWidth } from '../utils/Dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { djangoAuthApi, endpoints } from '../configs/Apis';
import SelectDropdown from 'react-native-select-dropdown'
import { RadioButton } from 'react-native-paper';
import { CheckBox } from 'react-native-elements';

const SurveyPost = ({ navigation }) => {
    const [user, dispatch] = useContext(MyUserContext);
    const [userInfo, setUserInfo] = useState();
    const [surveyName, setSurveyName] = useState('');

    const [selectedBeginDate, setSelectedBeginDate] = useState(new Date());
    const [selectedBeginTime, setSelectedBeginTime] = useState(new Date());
    const [showBeginDatePicker, setShowBeginDatePicker] = useState(false);
    const [showBeginTimePicker, setShowBeginTimePicker] = useState(false);
    const [beginMode, setBeginMode] = useState('date');

    const [selectedEndDate, setSelectedEndDate] = useState(new Date());
    const [selectedEndTime, setSelectedEndTime] = useState(new Date());
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);
    const [endMode, setEndMode] = useState('date');

    const [postContent, setPostContent] = useState('');

    const listQuestionType = ["Multiple-Choice", "Checkbox", "Text Input"]

    const [questionType, setQuestionType] = useState('');

    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [newQuestionType, setNewQuestionType] = useState('Multiple-Choice');
    const [newOption, setNewOption] = useState('');
    const [newOptions, setNewOptions] = useState([]);
    // const [aOption, setAOption] = useState({
    //     "question_option_value": '',
    //     "question_option_order": 0
    // });
    const [option, setOption] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [textAnswer, setTextAnswer] = useState('');

    const currentDate = new Date();

    const handleBeginDateChange = (event, date) => {
        setShowBeginDatePicker(false);
        setSelectedBeginDate(date || selectedBeginDate);
    };

    const handleBeginTimeChange = (event, time) => {
        setShowBeginTimePicker(false);
        setSelectedBeginTime(time || selectedBeginTime);
    };

    const showBeginMode = (modeToShow) => {
        if (modeToShow === 'date') {
            setShowBeginDatePicker(true);
            setShowBeginTimePicker(false);
            setBeginMode('date');
        } else if (modeToShow === 'time') {
            setShowBeginDatePicker(false);
            setShowBeginTimePicker(true);
            setBeginMode('time');
        }
        console.log(selectedBeginDate.toISOString().slice(0, 10), selectedBeginTime.getHours(), selectedBeginTime.getMinutes())
    };

    const combinedBeginDateTime = new Date(
        selectedBeginDate.getFullYear(),
        selectedBeginDate.getMonth(),
        selectedBeginDate.getDate(),
        selectedBeginTime.getHours(),
        selectedBeginTime.getMinutes()
    );

    const utcBeginDateTime = combinedBeginDateTime.toISOString();

    const handleEndDateChange = (event, date) => {
        setShowEndDatePicker(false);
        setSelectedEndDate(date || selectedEndDate);
    };

    const handleEndTimeChange = (event, time) => {
        setShowEndTimePicker(false);
        setSelectedEndTime(time || selectedEndTime);
    };

    const showEndMode = (modeToShow) => {
        if (modeToShow === 'date') {
            setShowEndDatePicker(true);
            setShowEndTimePicker(false);
            setEndMode('date');
        } else if (modeToShow === 'time') {
            setShowEndDatePicker(false);
            setShowEndTimePicker(true);
            setEndMode('time');
        }
        console.log(selectedEndDate.toISOString().slice(0, 10), selectedEndTime.getHours(), selectedEndTime.getMinutes())
    };

    const combinedEndDateTime = new Date(
        selectedEndDate.getFullYear(),
        selectedEndDate.getMonth(),
        selectedEndDate.getDate(),
        selectedEndTime.getHours(),
        selectedEndTime.getMinutes()
    );

    const utcEndDateTime = combinedEndDateTime.toISOString();

    const getCurrentUser = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            let res = await djangoAuthApi(token).get(endpoints['get-account-by-user'](user.id))
            setUserInfo(res.data);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getCurrentUser();
        console.log(questions)
    }, [questions])

    const createPostSurvey = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            let res = await djangoAuthApi(token).post(endpoints['create-post-survey'],
                {
                    "account_id": userInfo?.id,
                    "post_content": postContent,
                    "event_name": surveyName,
                    "start_time": utcBeginDateTime,
                    "end_time": utcEndDateTime
                }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log(res.data, res.status);
            navigation.navigate('Trang cá nhân');
        } catch (error) {
            console.log(error);
        }
    }

    const addQuestion = () => {
        if (newQuestion.trim() !== '') {
            const question = {
                content: newQuestion.trim(),
                type: newQuestionType,
                options: newOptions,
            };
            setQuestions([...questions, question]);
            setNewQuestion('');
            setNewQuestionType('Multiple-Choice');
            setNewOptions([]);
        }
    };

    const addBoxQuestion = () => {
        if (newQuestion.trim() !== '') {
            const question = {
                content: newQuestion.trim(),
                type: newQuestionType,
                options: options,
            };
            setQuestions([...questions, question]);
            setNewQuestion('');
            setNewQuestionType('Multiple-Choice');
            setOptions([]);
        }
    };

    const addOption = () => {
        if (newOption.trim() !== '') {
            setNewOptions([...newOptions, newOption]);
            setNewOption('');
        }
    };

    const deleteOption = (index) => {
        const updatedOptions = [...newOptions];
        updatedOptions.splice(index, 1);
        setNewOptions(updatedOptions);
    };

    const addBoxOption = () => {
        if (option.trim() !== '') {
            setOptions([...options, option.trim()]);
            setOption('');
        }
    };

    const deleteBoxOption = (index) => {
        const updatedOptions = [...options];
        updatedOptions.splice(index, 1);
        setOptions(updatedOptions);
    };

    const deleteQuestion = (index) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions);
    };

    const renderAnswerInput = () => {
        if (newQuestionType === 'Multiple-Choice') {
            return (
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter option..."
                        value={newOption}
                        onChangeText={(text) => setNewOption(text)}
                    />
                    <TouchableOpacity style={styles.addButton} onPress={addOption}>
                        <Text style={styles.buttonText}>Add option</Text>
                    </TouchableOpacity>
                    {newOptions.map((option, index) => (
                        <View key={index} style={styles.optionContainer}>
                            <RadioButton.Android
                                value={option}
                                status="unchecked"
                                onPress={() => setSelectedOption(option)}
                            />
                            <Text style={styles.optionText}>{option}</Text>
                            <TouchableOpacity onPress={() => deleteOption(index)}>
                                <Text style={styles.deleteButton}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            );
        } else if (newQuestionType === 'Checkbox') {
            return (
                <View>
                    {options.map((option, index) => (
                        <View key={index} style={styles.optionContainer}>
                            <CheckBox
                                checked={selectedOptions.includes(option)}
                                onPress={() => toggleCheckbox(option)}
                            />
                            <Text style={styles.optionText}>{option}</Text>
                            <TouchableOpacity onPress={() => deleteBoxOption(index)}>
                                <Text style={styles.deleteButton}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                    <View style={styles.optionContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter new option"
                            value={option}
                            onChangeText={text => setOption(text)}
                        />
                        <Button title="Add Option" onPress={addBoxOption} />
                    </View>
                </View>
            );
        } else if (newQuestionType === 'Text Input') {
            return (
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Short text answer"
                        value={textAnswer}
                        onChangeText={(text) => setTextAnswer(text)}
                    />
                </View>
            );
        }
        return null;
    };

    const [selectedOptions, setSelectedOptions] = useState([]);

    const toggleCheckbox = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    return (
        <>
            <ScrollView>
                <View>
                    <TextInput
                        value={surveyName}
                        onChangeText={(surveyName) => setSurveyName(surveyName)}
                        placeholder="Tên khảo sát"
                        style={styles.textInputStyle}
                    />
                </View>
                <View>
                    <TouchableOpacity onPress={() => showBeginMode("date")}>
                        <Text style={styles.textInputStyle}>
                            {selectedBeginDate.toISOString().slice(0, 10)}
                        </Text>
                        {showBeginDatePicker && (<DateTimePicker
                            value={selectedBeginDate}
                            mode={beginMode}
                            format="YYYY-MM-DD"
                            minimumDate={currentDate}
                            is24Hour={true}
                            maximumDate={new Date(2100, 0, 1)}
                            onChange={handleBeginDateChange}
                        />)}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => showBeginMode("time")}>
                        <Text style={styles.textInputStyle}>
                            {String(selectedBeginTime.getHours()).padStart(2, '0')}:{String(selectedBeginTime.getMinutes()).padStart(2, '0')}
                        </Text>
                        {showBeginTimePicker && (<DateTimePicker
                            value={selectedBeginTime}
                            mode={beginMode}
                            is24Hour={true}
                            onChange={handleBeginTimeChange}
                        />)}
                    </TouchableOpacity>
                    {/* <Text>{selectedDate.toLocaleString()}</Text> */}
                    <Text>{selectedBeginDate.toISOString().slice(0, 10)} {selectedBeginTime.getHours()}:{selectedBeginTime.getMinutes()}</Text>
                    <Text>{utcBeginDateTime}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => showEndMode("date")}>
                        <Text style={styles.textInputStyle}>
                            {selectedEndDate.toISOString().slice(0, 10)}
                        </Text>
                        {showEndDatePicker && (<DateTimePicker
                            value={selectedEndDate}
                            mode={endMode}
                            format="YYYY-MM-DD"
                            minimumDate={currentDate}
                            is24Hour={true}
                            maximumDate={new Date(2100, 0, 1)}
                            onChange={handleEndDateChange}
                        />)}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => showEndMode("time")}>
                        <Text style={styles.textInputStyle}>
                            {String(selectedEndTime.getHours()).padStart(2, '0')}:{String(selectedEndTime.getMinutes()).padStart(2, '0')}
                        </Text>
                        {showEndTimePicker && (<DateTimePicker
                            value={selectedEndTime}
                            mode={endMode}
                            is24Hour={true}
                            onChange={handleEndTimeChange}
                        />)}
                    </TouchableOpacity>
                    {/* <Text>{selectedDate.toLocaleString()}</Text> */}
                    <Text>{selectedEndDate.toISOString().slice(0, 10)} {selectedEndTime.getHours()}:{selectedEndTime.getMinutes()}</Text>
                    <Text>{utcEndDateTime}</Text>
                </View>
                <View>
                    <TextInput
                        multiline
                        numberOfLines={5}
                        value={postContent}
                        onChangeText={setPostContent}
                        placeholder="Description..."
                        style={styles.postInvitationInputStyle}
                    />
                </View>
                <View style={styles.container}>
                    {questions.map((question, index) => (
                        <View key={index} style={styles.questionContainer}>
                            <TouchableOpacity onPress={() => deleteQuestion(index)}>
                                <Text style={styles.deleteButton}>Delete</Text>
                            </TouchableOpacity>
                            <Text style={styles.questionText}>{question.content}</Text>
                            {question.type === 'Multiple-Choice' && (
                                <View>
                                    {question.options.map((option, optionIndex) => (
                                        <View key={optionIndex} style={styles.optionContainer}>
                                            <TouchableOpacity onPress={() => setSelectedOption(option)}>
                                                <View style={styles.radioButton}>
                                                    {selectedOption === option && <View style={styles.radioButtonSelected} />}
                                                </View>
                                            </TouchableOpacity>
                                            <Text style={styles.optionText}>{option}</Text>
                                            <TouchableOpacity onPress={() => deleteOption(optionIndex)}>
                                                <Text style={styles.deleteButton}>Delete</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                            )}
                            {question.type === 'Checkbox' && (
                                <View>
                                    {question.options.map((option, optionIndex) => (
                                        <View key={optionIndex} style={styles.optionContainer}>
                                            <CheckBox
                                                checked={selectedOptions.includes(option)}
                                                onPress={() => toggleCheckbox(option)}
                                            />
                                            <Text style={styles.optionText}>{option}</Text>
                                            <TouchableOpacity onPress={() => deleteOption(optionIndex)}>
                                                <Text style={styles.deleteButton}>Delete</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                            )}
                            {question.type === 'Text Input' && (
                                <View>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Short text answer"
                                        value={textAnswer}
                                        onChangeText={(text) => setTextAnswer(text)}
                                    />
                                </View>
                            )}
                        </View>
                    ))}
                    <View style={styles.newQuestionContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter a new question..."
                            value={newQuestion}
                            onChangeText={(text) => setNewQuestion(text)}
                        />
                        <View style={styles.typeContainer}>
                            <Text style={styles.typeLabel}>Question Type:</Text>
                            <RadioButton.Group
                                value={newQuestionType}
                                onValueChange={(value) => setNewQuestionType(value)}
                            >
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton.Android value="Multiple-Choice" />
                                    <Text style={styles.radioButtonLabel}>Multiple Choice</Text>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton.Android value="Checkbox" />
                                    <Text style={styles.radioButtonLabel}>Checkbox</Text>
                                </View>
                                <View style={styles.radioButtonContainer}>
                                    <RadioButton.Android value="Text Input" />
                                    <Text style={styles.radioButtonLabel}>Text Input</Text>
                                </View>
                            </RadioButton.Group>
                        </View>
                        {renderAnswerInput()}
                        <TouchableOpacity style={styles.addButton} onPress={() => {
                            if (newQuestionType === 'Multiple-Choice' || newQuestionType === 'Text Input') {
                                addQuestion();
                            } else if (newQuestionType === 'Checkbox') {
                                addBoxQuestion();
                            }
                        }}>
                            <Text style={styles.buttonText}>Add question</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={styles.createEventButt} onPress={() => createPostSurvey()}>
                        <Text>Tạo khảo sát</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    textInputStyle: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        textAlignVertical: 'top',
        fontSize: 18,
        borderRadius: 10
    },
    createEventButt: {
        padding: 10,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        // position: 'absolute',
        // bottom: 3,
        width: windowWidth / 2,
        borderWidth: 1
    },
    postInvitationInputStyle: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        textAlignVertical: 'top',
        fontSize: 18,
        borderRadius: 10
    },
    container: {
        flex: 1,
        padding: 16,
    },
    questionContainer: {
        marginBottom: 16,
    },
    deleteButton: {
        color: 'red',
        marginBottom: 8,
    },
    questionText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    optionText: {
        marginLeft: 8,
    },
    newQuestionContainer: {
        marginTop: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        padding: 8,
        marginBottom: 8,
    },
    typeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    typeLabel: {
        marginRight: 8,
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    radioButtonLabel: {
        marginLeft: 8,
    },
    addButton: {
        backgroundColor: 'blue',
        padding: 8,
        borderRadius: 4,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    radioButton: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    radioButtonSelected: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'black',
    },
});

export default SurveyPost;