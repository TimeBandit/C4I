import Slideout from 'slideout';

const slideOut = function() {
    Meteor.setTimeout(() => {

        console.log("slideout is alive");

        var slideout = new Slideout({
            'panel': document.getElementById('panel'),
            'menu': document.getElementById('menu'),
            'padding': 256,
            'tolerance': 70
        });

        // Toggle button
        document.querySelector('.toggle-button').addEventListener('click', function() {
            slideout.toggle();
        });
        
    }, 2000);

};

export default slideOut;
