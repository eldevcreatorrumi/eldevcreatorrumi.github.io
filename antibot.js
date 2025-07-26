document.addEventListener('DOMContentLoaded', function() {
    if (!sessionStorage.getItem('targetPath') && window.location.hash) {
        sessionStorage.setItem('targetPath', window.location.pathname + window.location.hash);
    }

    let checkboxChecked = false;
    let colorSelected = false;
    let selectedColor = null;
    let correctColor = null;

    const checkboxContainer = document.getElementById('checkboxContainer');
    const checkbox = document.getElementById('checkbox');
    const verifyButton = document.getElementById('verifyButton');
    const loading = document.getElementById('loading');
    const errorMessage = document.getElementById('errorMessage');
    const colorOptions = document.querySelectorAll('.color-option');
    const colorTitle = document.getElementById('colorTitle');
    const antibotContainer = document.querySelector('.antibot-container');

    const colors = [
        { name: 'красный', value: 'red', class: 'color-red', theme: 'theme-red' },
        { name: 'синий', value: 'blue', class: 'color-blue', theme: 'theme-blue' },
        { name: 'зеленый', value: 'green', class: 'color-green', theme: 'theme-green' },
        { name: 'желтый', value: 'yellow', class: 'color-yellow', theme: 'theme-yellow' },
        { name: 'фиолетовый', value: 'purple', class: 'color-purple', theme: 'theme-purple' },
        { name: 'оранжевый', value: 'orange', class: 'color-orange', theme: 'theme-orange' }
    ];

    function generateRandomColor() {
        const randomIndex = Math.floor(Math.random() * colors.length);
        correctColor = colors[randomIndex];
        colorTitle.textContent = `Выберите ${correctColor.name} цвет:`;
        
        applyColorTheme();
    }

    function applyColorTheme() {
        antibotContainer.classList.remove('theme-red', 'theme-blue', 'theme-green', 'theme-yellow', 'theme-purple', 'theme-orange');
        
        if (correctColor && correctColor.theme) {
            antibotContainer.classList.add(correctColor.theme);
        }
    }

    generateRandomColor();

    const refreshButton = document.getElementById('refreshButton');
    refreshButton.addEventListener('click', function() {
        colorOptions.forEach(opt => opt.classList.remove('selected'));
        
        generateRandomColor();
        
        selectedColor = null;
        colorSelected = false;
        updateVerifyButton();
    });

    checkboxContainer.addEventListener('click', function() {
        checkboxChecked = !checkboxChecked;
        checkboxContainer.classList.toggle('checked', checkboxChecked);
        updateVerifyButton();
    });

    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(opt => opt.classList.remove('selected'));
            
            this.classList.add('selected');
            
            selectedColor = this.dataset.color;
            colorSelected = selectedColor === correctColor.value;
            
            updateVerifyButton();
        });
    });

    function updateVerifyButton() {
        const canVerify = checkboxChecked && colorSelected;
        verifyButton.disabled = !canVerify;
        errorMessage.classList.toggle('show', !canVerify);
    }

    verifyButton.addEventListener('click', function() {
        if (!checkboxChecked || !colorSelected) {
            errorMessage.classList.add('show');
            return;
        }

        loading.classList.add('show');
        verifyButton.disabled = true;
        errorMessage.classList.remove('show');

        setTimeout(() => {
            loading.classList.remove('show');
            
            sessionStorage.setItem('antibotPassed', 'true');
            
            const targetPath = sessionStorage.getItem('targetPath');
            if (targetPath) {
                sessionStorage.removeItem('targetPath');
                window.location.href = targetPath;
            } else {
                window.location.href = '/';
            }
        }, 2000);
    });

    let mouseMovements = 0;
    let keyPresses = 0;

    document.addEventListener('mousemove', function() {
        mouseMovements++;
    });

    document.addEventListener('keydown', function() {
        keyPresses++;
    });

    verifyButton.addEventListener('click', function(e) {
        if (mouseMovements < 5 || keyPresses < 2) {
            e.preventDefault();
            errorMessage.textContent = 'Пожалуйста, взаимодействуйте со страницей';
            errorMessage.classList.add('show');
            return;
        }
    });
});
