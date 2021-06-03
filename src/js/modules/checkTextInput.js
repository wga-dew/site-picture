const checkTextInput = (selector) => {

    const txtInputs = document.querySelectorAll(selector);

    txtInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[A-Za-z]/g, '');
        });
    });

};

export default checkTextInput;