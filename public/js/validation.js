function formSubmit(event) {
    try {
        let title = document.getElementById('title').value.trim();
        let company = document.getElementById('company').value.trim();
        let location = document.getElementById('location').value.trim();
        let post_date = document.getElementById('post_date').value;
        let close_date = document.getElementById('close_date').value;
        let trade = document.getElementById('trade').value;
        trade = ! (trade == "Select a trade...");
        let type = document.querySelector('#job-type > div > input:checked');

        let errorElement = document.getElementById('err');
        let validationConditions = [title, company, location, post_date, close_date, trade, type];
        let errorMessages = ["Please enter a job title.", "Please enter a company name.", "Please enter a location.", "Please enter a posting date.", "Please enter a closing date.", "Please choose an applicable trade.", "Please choose an employment type."];
        errorElement.innerHTML = "";
        for (let i = 0; i < validationConditions.length; i++) {
            if (!validationConditions[i]) {
                event.preventDefault();
                errorElement.innerHTML += errorMessages[i] + "<br>";
            }
        }
        let postingLinkValue = document.getElementById('posting_link').value.trim();
        document.getElementById('posting_link').value = postingLinkValue.replace("https://", "").replace("http://", "");
    } catch (err) {
        console.log(err);
        event.preventDefault();
    }
}

document.getElementById('add-job-form').addEventListener("submit", formSubmit);
