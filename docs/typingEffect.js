const waveTextParagraph = document.querySelector('.home_wave_text');
const titleHeading = document.querySelector('.home_title');
const subtitleParagraph = document.querySelector('.home_subtitle');

const waveGreetingText = 'Hi ';
const titleText = "I'm Soumya,";
const subtitleText = ' a budding computer scientist based in the Pacific Northwest!';

/**
 * types one char at a time
 */
function typeTextIntoElement(element, text, characterDelay = 80) {
    return new Promise(resolve => {
        let characterIndex = 0;

        function typeCharacter() {
            if (characterIndex < text.length) {
                element.textContent += text.charAt(characterIndex);
                characterIndex++;
                setTimeout(typeCharacter, characterDelay);
            } else {
                resolve();
            }
        }

        typeCharacter();
    });
}

/**
 * waving emoji after a delay
 */
function addWavingEmoji(element, delayBeforeEmoji = 150) {
    return new Promise(resolve => {
        setTimeout(() => {
            const wavingEmoji = document.createElement('span');
            wavingEmoji.className = 'wave';
            wavingEmoji.textContent = '👋';
            element.appendChild(wavingEmoji);
            resolve();
        }, delayBeforeEmoji);
    });
}

/**
 * runs typing animation sequence in order
 */
async function runTypingSequence() {
    await typeTextIntoElement(waveTextParagraph, waveGreetingText);
    await addWavingEmoji(waveTextParagraph);
    await new Promise(resolve => setTimeout(resolve, 250)); // pause after emoji
    await typeTextIntoElement(titleHeading, titleText);
    await new Promise(resolve => setTimeout(resolve, 150)); // pause before subtitle
    await typeTextIntoElement(subtitleParagraph, subtitleText);
}

document.addEventListener('DOMContentLoaded', runTypingSequence);
