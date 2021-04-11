class TimeWidget {
    constructor() {
        const timeWidgetWorker = new Date();

        const TimeWidgetTick = () => {
            const timeWidgetWorker = new Date();
            document.getElementById('time@dothq.co').innerHTML = `
        <time>
            ${timeWidgetWorker.getHours().toString().padStart(2, '0')}:${timeWidgetWorker.getMinutes().toString().padStart(2, '0')}.${timeWidgetWorker.getSeconds().toString().padStart(2, '0')}
        </time>`;
        }

        var timeWidgetElement = document.createElement('div');
        timeWidgetElement.setAttribute('id', 'time@dothq.co');
        timeWidgetElement.setAttribute('class', 'widget top-left');
        timeWidgetElement.innerHTML = `
        <time>
            ${timeWidgetWorker.getHours().toString().padStart(2, '0')}:${timeWidgetWorker.getMinutes().toString().padStart(2, '0')}.${timeWidgetWorker.getSeconds().toString().padStart(2, '0')}
        </time>`;
        document.getElementById('widgets-container').appendChild(timeWidgetElement);
        setInterval(TimeWidgetTick, 995);
    }
}

new TimeWidget();