let messageSelector = document.querySelector('#message'),
    customMessageContainer = document.querySelector('#customMessageContainer')

messageSelector.addEventListener('change', function(){
    if(messageSelector.value == 'custom'){
        customMessageContainer.classList.remove('d-none')
    } else if (!customMessageContainer.classList.contains('d-none')){
        customMessageContainer.classList.add('d-none')
    }
})