# What is IndieClass

IndieClass is a platform for local talents to connect with clients. Every user can sign up for classes/experiences, or choose to host their own class/experience. The classes can range from a local tech meetup, an outdoor stargazing, to a yoga meditation session by a certified yoga instructor. This app encourages users to explore new experiences, discover new potentials and learn new skills.

![Screenshots](/__screenshots/image.png)

[Watch a 2-minute demo here 🙌](https://www.canva.com/design/DAEIJ7SlZb0/-SEovkewYt6YuwrUhOmozQ/view?utm_content=DAEIJ7SlZb0&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink)

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

### Google API Key

The App uses Google's places API. You'll need to get a key to have the app running.

1. Go to [Google Cloud Platform](https://console.cloud.google.com/home) and set up a new project by clicking on **Select a project** _(Right next where it says Google Cloud Platform )_.
2. Navigate to the project itself (you should be able to do this from the projects dashboard), and then hover over **APIs & Services** and click on **Credentials**
3. Now use the **Create Credentials** button to create an **API Key**.
4. Set up your environment variables in both the **Client** and **server**. In the client, create a `env.js` file and copy in the information in `env.example.js`. Set `KEY` to the API key you just got from Google. In the server file create a `.env file`, copy in the details from `.env.example` and set the `SECRET_API_KEY` as the API key you just got from Google

### Google OAuth client ID
In order to run authentication via google, you'll need a Android Client ID. To get one, follow the steps below:
1. In the [Google Cloud Platform](https://console.cloud.google.com/home) project mentioned earlier, create a new set of credentials, but this time, click on **OAuth Client ID**
2. Next go the the **Consent Screen**, add in your email address, name of project, click next and finally select **Android** as the Application type
3. In your terminal add in the following command to get the **Signing-certificate fingerprint**
   <pre><code>openssel rand -base64 32 | openssl sha1 -c</code></pre>
   Enter this fingerprint in the consent screen under **Signing-certificate fingerprint**
4. In your terminal add in the following command to get the **Package name**
   <pre><code>host.exp.exponent</code></pre>
   Enter the output from this command in the consent screen under **Package name**
5. You'll now get a Google OAuth Client ID which you can add in the `env.js` file under ANDOID_CLIENT_ID

### Stripe API Key

To run the [stripe](https://stripe.com/en-gb-us) in the sandbox we've set up, you'll need a **live publishable stripe API key**. To get one, follow the steps below.

1. Go to the stripe website and [sign up](https://stripe.com/en-gb-us)
2. Go through the steps to activate your stripe account in the dashboard _(Note: You'll have to add in your bank details)_
3. Click on **Get your live API keys** and get a live publishable API Key
4. Add the key to your `env.js` file under STRIPE_LIVE_PUBLISHABLE_KEY

## Starting the App

1. Use the `.env` file you created earlier using the `.env.example` file as a template. Here, set up the DATABASE_URL with your chosen port by updating the `PORT` in that line. This port number should be reflected in the `docker-compose.yml` file as the first number under ports. e.g. XXXX:5432
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
5. Now you'll be able to hit the play button in the _Your VirtualDevices_ page and an android phone will show up for you to run your app.
   From the expo page open in the browser, you'll be able to open the app by clicking on **Run on Android device/emulator**

## Optional extras

_This project runs on react native with expo and uses docker to set up the environment. To see your database in table format, you can connect the database using using [TablePlus](https://tableplus.com/)_

# Developer Team

- Paris Zhang - [Github](https://github.com/ParisQZhang) - [LinkedIn](https://www.linkedin.com/in/paris-qing-zhang/)
- Rushabh Mehta - [Github](https://github.com/RushabhM2) - [LinkedIn](www.linkedin.com/in/RushabhM2)
- Sebastian Chamley - [Github](https://github.com/chamley) - [LinkedIn](https://www.linkedin.com/in/sebastian-chamley-1277a11a1/)
