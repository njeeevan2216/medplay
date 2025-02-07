fetch(`/static/json/themes.json`)
            .then(response => response.json())
            .then(themes => {
                const themeContainer = document.getElementById('theme-box');
                themes.forEach(theme => {
                    const themeDiv = document.createElement('div');
                    themeDiv.classList.add('theme', theme.className);
                    themeDiv.onclick = () => changeTheme(theme.colors[0], theme.colors[1], theme.colors[2], theme.colors[3]);
                    
                    const themeName = document.createElement('span');
                    themeName.classList.add('theme-name');
                    themeName.textContent = theme.name;
                    themeDiv.appendChild(themeName);
                    
                    const colorBox = document.createElement('div');
                    colorBox.classList.add('theme-color-box');
                    theme.colors.forEach(color => {
                        const colorDiv = document.createElement('div');
                        colorDiv.classList.add('theme-color');
                        colorDiv.style.background = color;
                        colorBox.appendChild(colorDiv);
                    });
                    themeDiv.appendChild(colorBox);
                    
                    themeContainer.appendChild(themeDiv);
                });
            });

function changeTheme(c1, c2, c3, c4) {
    document.documentElement.style.setProperty('--text-notif', c1);
    document.documentElement.style.setProperty('--back-dark', c2);
    document.documentElement.style.setProperty('--card-back', c3);
    document.documentElement.style.setProperty('--out-accent', c4);
}