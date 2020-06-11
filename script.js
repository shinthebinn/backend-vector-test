$(function() {
    $('form').submit((event) => {
        event.preventDefault();

        let x = $("#x").val();
        let y = $("#y").val();

        let output = (html) => {
            $("#output").html(html);
        }

        fetch(`/magdir?x=${x}&y=${y}`)
            .then(response => response.json())
            .then(data => {
                output(`Magnitude is the square root of ${data.mag} <br/> Direction is ${data.dir}<span>&#176;<span/>`);
            });
    });
});