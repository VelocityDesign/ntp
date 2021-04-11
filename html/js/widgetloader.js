const loadWidgets = () => {
    fetch('/constants/widgets.json')
    .then((response) => {
        if (response.status == 200){
            response.json()
            .then((widgetsArray) => {
                widgetsArray.forEach((item) => {
                    initialiseWidget(item.path, item.entryPoint);
                });
            })
        } else {
            netError(response.status);
        }
    });
}

const initialiseWidget = (widgetURL) => {
    fetch(widgetURL)
    .then((response) => {
        if (response.status == 200){
            response.text()
            .then((widgetJS) => {
                const js = document.createElement("script");

                js.innerHTML = widgetJS

                document.body.appendChild(js);
            });
        } else {
            netError(response.status);
        }
    });
}