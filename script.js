function generateCV() {

    // PERSONAL INFO
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let location = document.getElementById("location").value;

    // OBJECTIVE
    let objective = document.getElementById("objective").value;

    // EDUCATION
    let degree = document.getElementById("degree").value;
    let college = document.getElementById("college").value;
    let year = document.getElementById("year").value;
    let cgpa = document.getElementById("cgpa").value;

    // SKILLS
    let skills = document.getElementById("skills").value;

    // PROJECTS
    let projectName = document.getElementById("projectName").value;
    let technologies = document.getElementById("technologies").value;
    let projectDesc = document.getElementById("projectDesc").value;
       projectDesc = projectDesc.substring(0, 150);
       objective = objective.substring(0, 200);

    // EXPERIENCE
    let experience = document.getElementById("experience").value;

    // CERTIFICATIONS
    let certifications = document.getElementById("certifications").value;

    // ACHIEVEMENTS
    let achievements = document.getElementById("achievements").value;

    // LANGUAGES
    let languages = document.getElementById("languages").value;

    // HOBBIES
    let hobbies = document.getElementById("hobbies").value;

    // PHOTO
    let photo = document.getElementById("photo").files[0];

    let reader = new FileReader();

    reader.onload = function () {

        let cvHTML = `
        
            <div id="cvContent">

                <center>

                    <img src="${reader.result}" class="profile-img">

                    <h1>${name}</h1>

                </center>
                <h2>Personal Details</h2>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Location:</strong> ${location}</p>
                <hr>

                <h2>Objective</h2>

                <p>${objective}</p>

                <h2>Education</h2>

                <p>
                    Degree: <strong>${degree}</strong><br>
                    College: ${college}<br>
                    Passing year: ${year}<br>
                    CGPA: ${cgpa}
                </p>

                <h2>Skills</h2>

                <p>${skills}</p>

                <h2>Projects</h2>

                <p>
                    Project Name: <strong>${projectName}</strong><br>
                    Technologies Used: ${technologies}<br>
                    Short Description: ${projectDesc}
                </p>

                <h2>Experience / Internship</h2>

                <p>${experience}</p>

                <h2>Certifications</h2>

                <p>${certifications}</p>

                <h2>Achievements</h2>

                <p>${achievements}</p>

                <h2>Languages Known</h2>

                <p>${languages}</p>

                <h2>Hobbies</h2>

                <p>${hobbies}</p>

            </div>
        `;

        document.getElementById("cvOutput").innerHTML = cvHTML;
    };

    // IF PHOTO EXISTS
    if (photo) {
        reader.readAsDataURL(photo);
    }

    // IF NO PHOTO
    else {

        let cvHTML = `
        
            <div id="cvContent">

                <h1>${name}</h1>

                <p><strong>Phone:</strong> ${phone}</p>

                <p><strong>Email:</strong> ${email}</p>

                <hr>

                <h2>Objective</h2>

                <p>${objective}</p>

                <h2>Education</h2>

                <p>
                    <strong>${degree}</strong><br>
                    ${college}<br>
                    ${year}<br>
                    CGPA: ${cgpa}
                </p>

                <h2>Skills</h2>

                <p>${skills}</p>

                <h2>Projects</h2>

                <p>
                    <strong>${projectName}</strong><br>
                    Technologies Used: ${technologies}<br>
                    ${projectDesc}
                </p>

                <h2>Experience / Internship</h2>

                <p>${experience}</p>

                <h2>Certifications</h2>

                <p>${certifications}</p>

                <h2>Achievements</h2>

                <p>${achievements}</p>

                <h2>Languages Known</h2>

                <p>${languages}</p>

                <h2>Hobbies</h2>

                <p>${hobbies}</p>

            </div>
        `;

        document.getElementById("cvOutput").innerHTML = cvHTML;
    }
  
}

/* DOWNLOAD PDF */

async function downloadPDF() {

    let element = document.getElementById("cvOutput");

    // Check if CV exists
    if (element.innerHTML.trim() === "") {
        alert("Please generate the CV first.");
        return;
    }

    // Wait for images to fully load
    const images = element.getElementsByTagName("img");

    const imagePromises = Array.from(images).map((img) => {
        return new Promise((resolve) => {

            if (img.complete) {
                resolve();
            }

            else {
                img.onload = resolve;
                img.onerror = resolve;
            }
        });
    });

    await Promise.all(imagePromises);

    // PDF options
    let options = {

        margin: 0,

        filename: "My_CV.pdf",

        image: {
            type: "jpeg",
            quality: 1
        },

        html2canvas: {
            scale: 2,
            useCORS: true,
            logging: false
        },

        jsPDF: {
            unit: "px",
            format: [794, 1123], // A4 Size
            orientation: "portrait"
        }
    };

    // Generate PDF
    html2pdf()
        .set(options)
        .from(element)
        .save();
}
/* PRINT CV */

function printCV() {
    window.print();
}

/* DARK MODE */

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}