document.addEventListener('DOMContentLoaded', () => {
    const toggles = document.querySelectorAll('.expand-toggle');
    toggles.forEach(toggle => {
        const container = toggle.closest('.not-prose');
        const codeBlock = container.querySelector('.code-block');
        const expandText = toggle.querySelector('.expand-text');
        const collapseText = toggle.querySelector('.collapse-text');
        
        // Set initial state
        codeBlock.dataset.collapsed = 'true';
        codeBlock.style.maxHeight = '27rem';

        toggle.addEventListener('click', () => {
            if (codeBlock.dataset.collapsed === 'true') {
                codeBlock.style.maxHeight = codeBlock.scrollHeight + 'px';
                codeBlock.dataset.collapsed = 'false';
            } else {
                codeBlock.style.maxHeight = '27rem';
                codeBlock.dataset.collapsed = 'true';
            }
            
            expandText.classList.toggle('hidden');
            collapseText.classList.toggle('hidden');

            const action = expandText.classList.contains('hidden') ? 'expand' : 'collapse';
        });
    });
});