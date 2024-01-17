# Szakdolgozat_BTSZ - Thesis Project

**Abstract**
The sport of nine pin bowling is not very popular these days, even though the
Hungarians are at the forefront internationally. This sport is extremely special, since in
addition to the players' fight against each other, the overall performance of the team also
contributes greatly to the outcome of the final result.
There are several nine pin bowling alleys and teams in Budapest, who compete
every year within the framework of the capital championship. This is organized and
supervised by the Budapest Nine Pin Bowlers' Association, which was founded in 1934.
The task of the association is to announce the competitions or championships, judge the
entries, draw the matches, and provide a referee to conduct them. They manage the
results of the given season and, at the end of the season, award medals to the best
performing teams within the framework of the results announcement.
Like all major associations, the Budapest Nine Pin Bowlers' Association has its
own website, where the previously mentioned data is stored and the nine pin bowling
public is informed. Unfortunately, this website is outdated, not maintained, it is difficult
for an average user to adjust to it and long waiting times are to be expected, which is
why I felt that the association needed a much more modern, cleaner and user-friendly
website. The application I made reimagines this website, correcting existing errors and
offering a better user experience for both content managers and average users.
This multi-layered application implements the server side using Spring Boot and
Kotlin, where authentication is handled using JWT (JSON Web Token). The data is
stored in a MySQL database, which is displayed on the client side using the server. The
client is a React application that I created in TypeScript. As a result, the new application
not only offers the association modern and efficient tools, but also provides an easy-to-
navigate and usable interface for the nine pin bowling community.

**Running the Thesis Project:**

In one terminal, navigate to the backend folder using the command cd "btsz - backend\btsz".
Type the command gradlew.bat bootRun.
(Requires JDK 17.0.8 version)
In the other terminal, navigate to the frontend folder using the command cd "btsz - frontend".
Use the command npm install --legacy-peer-deps.
Type the command npm run start.
(Requires Node.js 18.17.1 version)
If not already downloaded, download MySQL Workbench.
(Root user password should be "root123".)
Open Workbench and connect to Local Instance MySQL80 with the root user.
Use the Server/Data Import to import the btsz-db.sql file.
Choose the "Import from Self-Contained File" option.
Set the Default Target Schema to a new one named "btsz."

Thesis operation demo: https://youtu.be/teN11569cwI
