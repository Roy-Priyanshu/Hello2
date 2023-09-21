// const form = document.getElementsByClassName('form')[0];

// const navigateToNextForm = (reason) => {
//     reason = reason.toLowerCase();
    
//     const templates = {
//         'cruelty': 'my husband hits me',
//         'mutual': 'we just want a divorce and have settled mutually', 
//         'adultary': 'my husband has been cheating on me with another women',
//     };

//     for(const template in templates) {
//         if(reason === templates[template]) {
//             return template;
//         }
//     }

//     return 'No Templates Available';
// }

// document.addEventListener('DOMContentLoaded', () => {
//     form.addEventListener('submit', (event) => {
//         event.preventDefault();
    
//         const formData = new FormData(form);
    
//         const reason = formData.get('__15__');          //getting the reason input

//         const nextForm = navigateToNextForm(reason);

//         window.location.href = `./${nextForm}.html`;
        
//     });
// });







const form = document.getElementsByClassName('form')[0];

document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const formData = new FormData(form);
    
        const user_input = formData.get('__15__'); // Getting the user input

        try {
            // Send a POST request to your Django API endpoint
            const response = await fetch('/api/classify/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': getCookie('csrftoken'), // Include CSRF token
                },
                body: `user_input=${user_input}`,
            });

            const categoryMappings = {
                // 'Cruelty': 'cruelty',
                'mutual consent': 'mutual',
                'adultery': 'adultary',
            };
            
            if (response.ok) {
                const data = await response.json();
                let predicted_category = categoryMappings[data.predicted_category] || data.predicted_category;
                // const predicted_category = data.predicted_category.toLowerCase();;
                // Assuming predicted_category is a string
                
                // if (predicted_category === 'cruelty') {
                //     predicted_category = 'cruelty';
                // } 
                // if (predicted_category === 'mutual consent') {
                //     predicted_category = 'mutual';
                // } 
                // if (predicted_category === 'adultery') {
                //     predicted_category = 'adultary';
                // }
                print(predicted_category)
                // Use the predicted_category for redirection
                window.location.href = `./${predicted_category}.html`;
            } else {
                console.error('Failed to classify:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Function to get CSRF token (you can use your own method)
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
});
