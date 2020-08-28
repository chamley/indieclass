# What is IndieClass
IndieClass stands for independent class. This is an app allowing independent instructors such as Yoga experts, Chefs or even Hip Hop dancers set up host classes that the general public can attend. The app prioritizes the finding of these hosted classes.

# Getting Started
## Downloads required
In order to get started, you'll need [Docker](https://www.docker.com/) set up on your local machine. To do this, carry out the following steps:
1. Download [docker](https://www.docker.com/get-started)
2. In the **server** folder, run the following to set up your environment and database via docker **Ensure your ports are set up**, see [Starting the App](#starting-the-app)
<pre><code>docker-compose up</code></pre>
3. In the **server** folder, run the following to ensure docker is running
<pre><code>docker ps</code></pre>
You should see a response as follows:
<pre><code>CONTAINER ID      IMAGE       COMMAND       CREATED      STATUS       PORTS        NAMES</code></pre>

## Setting up Expo
The app is build on react native, which means you'll need a way to run the app on a phone or emulator. To do this, you'll need [expo](https://expo.io/), follow the steps below to get it up and running
1. Download [expo](https://expo.io/learn)
2. Install expo using the following
<pre><code>npm install expo-cli --global</code></pre>

## Starting the App
1. Create a `.env` file using the `.env.example` file as a template. Set up the DATABASE_URL with your chosen port by updating the `PORT` in that line. This port number should be reflected in the `docker-compose.yml` file as the first number under ports. e.g. XXXX:5432 
2. In the **server** folder, run the following
<pre><code>node index.js</code></pre>
3. In the **client** folder 
<pre><code>expo start</code></pre>
This will open a page on your browser from which you can run the app on an emulator or phone

### Running the app on an Android emulator
1. Download [Android Studio](https://developer.android.com/studio)
2. Open up Android Studio once downloaded. Under **Configure**, click on **AVD Manager**.
3. Click on **Create Virtual Device**. Here you can select an Android phone to emulate, and then click **Next**.
4. Download a system image (The download will be in the range of 10GB), and then click **Next** and **Finish**.
5. Now you'll be able to hit the play button in the *Your VirtualDevices* page and an android phone will show up for you to run your app.
From the expo page open in the browser, you'll be able to open the app by clicking on **Run on Android device/emulator**

## Optional extras
*This project runs on react native with expo and uses docker to set up the environment. To see your database in table format, you can connect the database using using [TablePlus](https://tableplus.com/)*

# Screenshots
## Explore new classes pages
* Categories
* Map
* ViewClass

## View My Classes pages
* List view
* Calendar View

## Profile Menu
* Menu
* Host a Class
* View hosted Classes
* Bio page

# Developer Team
* Paris Zhang - [Github](https://github.com/ParisQZhang) - [LinkedIn](https://www.linkedin.com/in/paris-qing-zhang/)
* Rushabh Mehta - [Github](https://github.com/RushabhM2) - [LinkedIn](www.linkedin.com/in/RushabhM2)
* Sebastian Chamley - [Github](https://github.com/chamley) - [LinkedIn](https://www.linkedin.com/in/sebastian-chamley-1277a11a1/)

