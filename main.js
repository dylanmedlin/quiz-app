const start_page = {
    template: `
        <div>
            <!-- Buttons to either login, register or login as guest -->
            <div class="start_buttons">
                <router-link to="/login" class="button logins login">Login</router-link>
                <router-link to="/register" class="button logins register">Register</router-link>
                <router-link to="/home" class="button logins guest">Guest</router-link>
            </div>
        </div>
    `
}

const login_page = {
    template: `
        <div>
            <h1 id="logintext">Login</h1>
            <!-- Form used for getting user input -->
            <form autocomplete="off">  
                <div class="container">   
                    <label>Username : </label>   
                    <input type="text" placeholder="Enter Username" name="username" v-model="username" required>  
                    <label>Password : </label>   
                    <input type="password" placeholder="Enter Password" name="password" v-model="password" required>  
                    <button v-on:click='login()'>Login</button>   
                    <input type="checkbox" checked="checked"> Remember me   
                    <router-link to="/" type="button" class="cancelbtn"> Cancel</router-link> 
                </div>   
            </form>
        </div>
    `,
    data() {
        return {
            // variables that are binded to what the user enters
            username: "",
            password: "",
            loggedIn: false,
            // Test account used for demonstration
            testAccount: {
                username: "Dylan",
                password: "123",
            }
        }
    },
    methods: {
        // login function runs when user clicks login button
        login() {
            // if username and password are not empty
            if (this.username != "" && this.password != "") {
                // compare username and password to testAccount username and password
                if (this.username == this.testAccount.username && this.password == this.testAccount.password) {
                    // If it matches go to home page and query username and loggedIn status
                    this.$router.push({ path: '/home', query: { username: this.username, loggedIn: true } })
                } else {
                    // If the Username and password dont match
                    alert("Username and password dont match");
                }
            } else {
                // if the username and password are blank
                alert("Enter username and password");
            }
        }
    }
}

const register_page = {
    template: `
        <div>
            <h1 id="logintext">Register</h1>
            <!-- Form used for getting user input -->
            <form autocomplete="off">  
                <div class="container">   
                    <label>Username : </label>   
                    <input type="text" placeholder="Enter Username" name="username" v-model="username" required>  
                    <label>Password : </label>   
                    <input type="password" placeholder="Enter Password" name="password" v-model="password" required>
                    <label>Re-Enter Password : </label>   
                    <input type="re-password" placeholder="Re-Enter Password" name="re-password" v-model="repassword" required>  
                    <button type="submit">Register</button>   
                    <input type="checkbox" checked="checked"> Remember me   
                    <router-link to="/" type="button" class="cancelbtn"> Cancel</router-link>     
                </div>   
            </form>
        </div>
    `,
    data() {
        return {
            // variables that are binded to what the user enters
            username: "",
            password: "",
            repassword: ""
        }
    },

}

const home_page = {
    template: `
        <div>
            <div id='selectquiz'>Select a Quiz:</div>
            <!-- Buttons to select quiz -->
            <div class="buttonlist" id="quizbuttons">
                <router-link :to="{ path: '/quiz', query: { selectQuiz: 0 }}" class="button math">Math</router-link>
                <router-link :to="{ path: '/quiz', query: { selectQuiz: 1 }}" class="button science">Science</router-link>
                <router-link :to="{ path: '/quiz', query: { selectQuiz: 2 }}" class="button geography">Geography</router-link>
                <router-link :to="{ path: '/quiz', query: { selectQuiz: 3 }}" class="button history">History</router-link>
            </div>
        </div>
    `,
    data: function () {
        return {
            // selectQuiz is used to select a quiz and gets passed down as query 
            selectQuiz: 0
        }
    },
}

const quiz_page = {
    name: 'quiz',
    template: `
        <div v-if='questionNum < quiz[selectedQuiz].length'>
            <div id="score">{{quiz[selectedQuiz][0].quizName}} <br> Score: {{score}}</div>
            <!-- Text to display the current question. -->
            <div id="question">Question: {{questionNum+1}}/{{quiz[selectedQuiz].length}}<br>{{quiz[selectedQuiz][questionNum].question}}</div>
            <!-- Buttons to select an answer -->
            <div class="buttonlist" id="answerbuttons">
                <div v-on:click="answerSelected1" class="button answer">{{quiz[selectedQuiz][questionNum].answer1}}</div>
                <div v-on:click="answerSelected2" class="button answer">{{quiz[selectedQuiz][questionNum].answer2}}</div>
                <div v-on:click="answerSelected3" class="button answer">{{quiz[selectedQuiz][questionNum].answer3}}</div>
                <div v-on:click="answerSelected4" class="button answer">{{quiz[selectedQuiz][questionNum].answer4}}</div>
                <div v-on:click="skip" class="button skip">Skip</div>
            </div>
        </div>

        <div v-else>
            <div id="endscore" v-bind:class='{goodScore: score > 6}'>{{quiz[selectedQuiz][0].quizName}} <br> Your score is: {{score}}/{{quiz[selectedQuiz].length}}</div>
            <div v-on:click="retry" class="button retry">Retry?</div>
            <router-link to="/home" type="button" class="button home">Home</router-link> 
        </div>
    `,
    data: function () {
        return {
            score: 0,
            selectedQuiz: this.$route.query.selectQuiz, // Get selected quiz from query
            questionNum: 0, //  current question number
            quiz: [
                // math quiz
                [
                    // question 1
                    {
                        quizName: "Math", // used to identify quiz name
                        question: "5 + 4 = ?",
                        answer1: "10",
                        answer2: "8",
                        answer3: "9",
                        answer4: "1",
                        correct: 3,
                    },
                    // question 2
                    {
                        question: "8 + 12 = ?",
                        answer1: "18",
                        answer2: "20",
                        answer3: "4",
                        answer4: "22",
                        correct: 2,
                    },
                    // question 3
                    {
                        question: "6 + 2 = ?",
                        answer1: "8",
                        answer2: "12",
                        answer3: "62",
                        answer4: "4",
                        correct: 1,
                    },
                    // question 4
                    {
                        question: "8 - 2 = ?",
                        answer1: "10",
                        answer2: "12",
                        answer3: "-10",
                        answer4: "6",
                        correct: 4,
                    },
                    // question 5
                    {
                        question: "2 * 4 = ?",
                        answer1: "6",
                        answer2: "8",
                        answer3: "2",
                        answer4: "24",
                        correct: 2,
                    },
                    // question 6
                    {
                        question: "10 / 2 = ?",
                        answer1: "20",
                        answer2: "10",
                        answer3: "12",
                        answer4: "5",
                        correct: 4,
                    },
                    // question 7
                    {
                        question: "8 - 10 = ?",
                        answer1: "18",
                        answer2: "-18",
                        answer3: "-2",
                        answer4: "-4",
                        correct: 3,
                    },
                    // question 8
                    {
                        question: "6 * 4 = ?",
                        answer1: "12",
                        answer2: "10",
                        answer3: "24",
                        answer4: "22",
                        correct: 3,
                    },
                    // question 9
                    {
                        question: "12 / 2 = ?",
                        answer1: "24",
                        answer2: "12",
                        answer3: "1",
                        answer4: "6",
                        correct: 4,
                    },
                    // question 10
                    {
                        question: "7 + 3 = ?",
                        answer1: "10",
                        answer2: "73",
                        answer3: "13",
                        answer4: "5",
                        correct: 1,
                    }

                ],
                // science quiz
                [
                    // question 1
                    {
                        quizName: "Science",
                        question: "What is the biggest planet in our solar system?",
                        answer1: "Earth",
                        answer2: "Jupiter",
                        answer3: "Saturn",
                        answer4: "Neptune",
                        correct: 1,
                    },
                    // question 2
                    {
                        question: "What is the chemical symbol for the element oxygen?",
                        answer1: "N",
                        answer2: "H",
                        answer3: "O",
                        answer4: "C",
                        correct: 3,
                    },
                    // question 3
                    {
                        question: "What is the 7th element on the periodic table of elements?",
                        answer1: "Hydrogen",
                        answer2: "Carbon",
                        answer3: "Sodium",
                        answer4: "Nitrogen",
                        correct: 4,
                    },
                    // question 4
                    {
                        question: "Which frozen gas forms dry ice?",
                        answer1: "Carbon Dioxide",
                        answer2: "Oxygen",
                        answer3: "Nitrogen",
                        answer4: "Hydrogen",
                        correct: 1,
                    },
                    // question 5
                    {
                        question: "Which planet has the most moons?",
                        answer1: "Saturn",
                        answer2: "Mars",
                        answer3: "Earth",
                        answer4: "Jupiter",
                        correct: 4,
                    },
                    // question 6
                    {
                        question: "What is the closest planet to the Sun?",
                        answer1: "Mercury",
                        answer2: "Mars",
                        answer3: "Earth",
                        answer4: "Jupiter",
                        correct: 1,
                    },
                    // question 7
                    {
                        question: "What is the name of the 2nd biggest planet in our solar system?",
                        answer1: "Saturn",
                        answer2: "Mars",
                        answer3: "Earth",
                        answer4: "Jupiter",
                        correct: 2,
                    },
                    // question 8
                    {
                        question: "What is the first element on the periodic table?",
                        answer1: "Oxygen",
                        answer2: "Nitrogen",
                        answer3: "Hydrogen",
                        answer4: "Carbon",
                        correct: 3,
                    },
                    // question 9
                    {
                        question: "What is the chemical symbol for gold?",
                        answer1: "G",
                        answer2: "A",
                        answer3: "Go",
                        answer4: "Au",
                        correct: 4,
                    },
                    // question 10
                    {
                        question: "What is H20 more commonly known as?",
                        answer1: "Air",
                        answer2: "Water",
                        answer3: "Dirt",
                        answer4: "Sand",
                        correct: 2,
                    }
                ],
                // geography quiz
                [
                    // question 1
                    {
                        quizName: "Geography",
                        question: "What is the tallest mountain on Earth?",
                        answer1: "Mount Everest",
                        answer2: "Mount Washington",
                        answer3: "Mount Whitney",
                        answer4: "Mount St. Helens",
                        correct: 1,
                    },
                    // question 2
                    {
                        question: "How many deserts are there in Africa?",
                        answer1: "One",
                        answer2: "Three",
                        answer3: "Four",
                        answer4: "Seven",
                        correct: 2,
                    },
                    // question 3
                    {
                        question: "What is the largest of North America's Great Lakes?",
                        answer1: "Lake Erie",
                        answer2: "Lake Scary",
                        answer3: "Lake Gargantuan",
                        answer4: "Lake Superior",
                        correct: 4,
                    },
                    // question 4
                    {
                        question: "Which of these is not a continent?",
                        answer1: "Alaska",
                        answer2: "South America",
                        answer3: "Antartica",
                        answer4: "Africa",
                        correct: 1,
                    },
                    // question 5
                    {
                        question: "What do you call the place at which two streams flow together to form one larger stream?",
                        answer1: "Mouth",
                        answer2: "Blank",
                        answer3: "Waterfall",
                        answer4: "Confluence",
                        correct: 4,
                    },
                    // question 6
                    {
                        question: "Which river flows through the rainforests of Brazil?",
                        answer1: "Rio Grande",
                        answer2: "Kookaburra",
                        answer3: "Amazon",
                        answer4: "Watus",
                        correct: 3,
                    },
                    // question 7
                    {
                        question: "What caused Oregon's Crater Lake to form?",
                        answer1: "Earthquake",
                        answer2: "Meteor",
                        answer3: "Glacier",
                        answer4: "Volcano collapse",
                        correct: 1,
                    },
                    // question 8
                    {
                        question: "What do you call the piece of land surrounded by water on three sides?",
                        answer1: "Peninsula",
                        answer2: "Island",
                        answer3: "Triangle",
                        answer4: "Alluvia",
                        correct: 1,
                    },
                    // question 9
                    {
                        question: "On which continent would you find the Andes mountains?",
                        answer1: "North America",
                        answer2: "South America",
                        answer3: "Africa",
                        answer4: "Antartica",
                        correct: 2,
                    },
                    // question 10
                    {
                        question: "Which is the tallest waterfall in the world?",
                        answer1: "Victoria Falls",
                        answer2: "Angel Falls",
                        answer3: "Niagara Falls",
                        answer4: "Antartica",
                        correct: 2,
                    }
                ],
                // history quiz
                [
                    // question 1
                    {
                        quizName: "History",
                        question: "Which of these countries did the Soviet Union NEVER invade?",
                        answer1: "Sweeden",
                        answer2: "Poland",
                        answer3: "Finland",
                        answer4: "Afghanistan",
                        correct: 1,
                    },
                    // question 2
                    {
                        question: "Who was the first person to orbit the Earth?",
                        answer1: "Neil Armstrong",
                        answer2: "John Glenn",
                        answer3: "Yuri Gagarin",
                        answer4: "Valentina Tereshkova",
                        correct: 3,
                    },
                    // question 3
                    {
                        question: "Which of these cities was NOT founded by the Romans?",
                        answer1: "Cologne",
                        answer2: "Alexandria",
                        answer3: "London",
                        answer4: "Rome",
                        correct: 2,
                    },
                    // question 4
                    {
                        question: "Where did Zoroastrianism originate?",
                        answer1: "Persia",
                        answer2: "India",
                        answer3: "Egypt",
                        answer4: "South America",
                        correct: 1,
                    },
                    // question 5
                    {
                        question: "Which of these writers was NOT English?",
                        answer1: "Jane Austen",
                        answer2: "Oscar Wilde",
                        answer3: "Charles Dickens",
                        answer4: "Agatha Christie",
                        correct: 2,
                    },
                    // question 6
                    {
                        question: "Which of the following was NOT originally invented in China?",
                        answer1: "Concrete",
                        answer2: "Silk",
                        answer3: "Gunpowder",
                        answer4: "Paper money",
                        correct: 1,
                    },
                    // question 7
                    {
                        question: "What does a dendrochronologist use to establish dates?",
                        answer1: "Solar eclipses",
                        answer2: "Tree rings",
                        answer3: "Carbon isotopes",
                        answer4: "Ice cores",
                        correct: 2,
                    },
                    // question 8
                    {
                        question: "How many wives did Henry VIII have?",
                        answer1: "1",
                        answer2: "2",
                        answer3: "3",
                        answer4: "6",
                        correct: 4,
                    },
                    // question 9
                    {
                        question: "When was the last time Moscow was ever captured by a foreign power?",
                        answer1: "By Ögedei Khan in 1238",
                        answer2: "By Hitler in 1942",
                        answer3: "Never",
                        answer4: "By Napoleon in 1812",
                        correct: 4,
                    },
                    // question 10
                    {
                        question: "What was the original purpose of the Taj Mahal?",
                        answer1: "A mausoleum",
                        answer2: "An armory",
                        answer3: "A mosque",
                        answer4: "A palace",
                        correct: 1,
                    },
                ],

            ],
        }
    },
    methods: {
        // Answer 1 selected
        answerSelected1: function () {
            // if answer 1 is correct increase score
            if (this.quiz[this.selectedQuiz][this.questionNum].correct == 1) {
                this.score++;
            }
            // Go to next question
            this.questionNum++;
        },
        // Answer 2 selected
        answerSelected2: function () {
            // if answer 2 is correct increase score
            if (this.quiz[this.selectedQuiz][this.questionNum].correct == 2) {
                this.score++;
            }
            // Go to next question
            this.questionNum++;
        },
        // Answer 3 selected
        answerSelected3: function () {
            // if answer 3 is correct increase score
            if (this.quiz[this.selectedQuiz][this.questionNum].correct == 3) {
                this.score++;
            }
            // Go to next question
            this.questionNum++;
        },
        // Answer 4 selected
        answerSelected4: function () {
            // if answer 4 is correct increase score
            if (this.quiz[this.selectedQuiz][this.questionNum].correct == 4) {
                this.score++;
            }
            // Go to next question
            this.questionNum++;
        },
        // Skip button selected
        skip: function () {
            this.questionNum++;
        },
        // restarts quiz
        retry: function () {
            // Set score and question number to 0
            this.questionNum = 0;
            this.score = 0;
        }
    },
};

const routes = [
    { path: '', component: start_page },
    { path: '/login', component: login_page },
    { path: '/register', component: register_page },
    { path: '/home', component: home_page },
    { path: '/quiz', component: quiz_page }
]

const router = new VueRouter({
    routes
})

// Component for header, Used on all pages
Vue.component('navheader', {
    name: 'navheader',
    template: `
        <div>
            <!-- Change header when on start page -->
            <header id="start_page_header" v-if='this.$route.path == "/"'>
                <h1>Welcome to Dylan's Quizzes!</h1>
            </header>
        
            <div id="header" v-else>
                <header>
                    <h1>Dylan's Quizzes</h1>
                </header>
                <!-- Navigation Bar -->
                <div>
                    <ul id="navbuttons">
                        <!-- Swap home button to 'exit' on home screen -->
                        <router-link to="/" v-if='this.$route.path == "/home"'>Exit</router-link>
                        <router-link to="/home" v-else>Home</router-link>

                        <!-- Change buttons depending if logged in or not -->
                        <div v-if="loggedIn == undefined" id="rightbuttons">
                            <router-link to="/register">Register</router-link>
                            <router-link to="/login">Login</router-link>
                        </div>
                        <div v-else id="rightbuttons">
                            <li><div id="user">Logged In: {{username}}</div></li>
                            <li><div v-on:click="logOut" id="divbutton">Sign Out</div></li>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    `,
    data: function () {
        return {
            // get username and if user is logged in from query
            loggedIn: this.$route.query.loggedIn,
            username: this.$route.query.username
        }
    },
    methods: {
        logOut: function () {
            // set loggedIn and username to undefined to log user out
            this.loggedIn = undefined
            this.username = undefined
            // remove query information from url
            this.$router.push({ path: '/' })
        }
    },
})

new Vue({
    el: '#app',
    router
})