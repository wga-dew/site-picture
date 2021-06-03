import {
    postData
} from '../services/requests';

const drop = () => {
    // drag *
    // dragend *
    // dragenter - объект над dropArea
    // dragexit *
    // dragleave - объект за пределами dropArea
    // dragover - объек двигаеться в пределах dropArea
    // dragstart *
    // drop - объект отправлен в dropArea

    const fileInputs = document.querySelectorAll("[name='upload']");

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefault, false);
        });
    });

    function preventDefault(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(item) {
        item.closest('.file_upload').style.border = '5px solid yellow';
        item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0, .7)';
    }

    function unHighlight(item) {
        item.closest('.file_upload').style.border = 'none';

        if (item.closest('.calc_form')) {
            item.closest('.file_upload').style.backgroundColor = '#fff';
        } else if (item.closest('.drop_file')) {
            item.closest('.file_upload').style.backgroundColor = '#f7e7e6';
        } else {
            item.closest('.file_upload').style.backgroundColor = '#ededed';
        }
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unHighlight(input), false);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;

            if (input.closest('.drop_file')) {
                let fileData = {};

                input.files.forEach(file => {
                    fileData = {
                        name: file.name,
                        size: file.size,
                        type: file.type
                    };
                });

                fileData = JSON.stringify(fileData);

                postData('assets/server.php', fileData)
                    .then(res => {
                        input.previousElementSibling.textContent = 'Файл отправлен...';
                    })
                    .catch(() => {
                        input.previousElementSibling.textContent = 'Произошла ошибка...';
                    })
                    .finally(() => {
                        setTimeout(() => {
                            input.previousElementSibling.textContent = 'Файл не выбран';
                        }, 3000);
                    });
            }

            let dots;
            let arr = input.files[0].name.split('.');
            arr[0].length > 6 ? dots = '...' : dots = '.';

            const name = arr[0].substring(0, 6) + dots + arr[1];
            input.previousElementSibling.textContent = name;
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('input', (e) => {

            if (input.closest('.drop_file')) {
                let fileData = {};

                input.files.forEach(file => {
                    fileData = {
                        name: file.name,
                        size: file.size,
                        type: file.type
                    };
                });

                fileData = JSON.stringify(fileData);

                postData('assets/server.php', fileData)
                    .then(res => {
                        input.previousElementSibling.textContent = 'Файл отправлен...';
                    })
                    .catch(() => {
                        input.previousElementSibling.textContent = 'Произошла ошибка...';
                    })
                    .finally(() => {
                        input.value = '';
                        setTimeout(() => {
                            input.previousElementSibling.textContent = 'Файл не выбран';
                        }, 3000);
                    });
            }

            let dots;
            let arr = input.files[0].name.split('.');
            arr[0].length > 6 ? dots = '...' : dots = '.';

            const name = arr[0].substring(0, 6) + dots + arr[1];
            input.previousElementSibling.textContent = name;
        });
    });
};

export default drop;