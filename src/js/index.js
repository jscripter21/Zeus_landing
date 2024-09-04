document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.wheel_btn');
  const spinner = document.querySelector('.wheel_spinner--main');
  const overlay = document.getElementById('overlay');
  const audioModal = document.getElementById('audioPermissionModal');
  const acceptButton = document.getElementById('acceptAudio');
  const declineButton = document.getElementById('declineAudio');
  const backgroundMusic = document.querySelector('.background-music');
  const soundClickSelector = '#sound-second-click';
  const soundClickFirstSelector = '#sound-first-click';
  const stormImage = document.querySelector('.wheel_spinner_img-storm');

  let secondClickReady = false;
  let isSoundAllowed = false;

  if (button && spinner) {
    button.addEventListener('click', () => {
      if (isSoundAllowed) {
        playSound(soundClickSelector);
      }

      if (!secondClickReady) {
        startSpin();
      } else {
        finishSpin();
        setTimeout(showPopup, 5500);
      }

      if (stormImage) {
        setTimeout(() => {
          stormImage.classList.add('blink-animation');
          if (isSoundAllowed) {
            playSound(soundClickFirstSelector);
          }
          setTimeout(() => {
            stormImage.classList.remove('blink-animation');
          }, 1500);
        }, 5000);
      }
    });
  } else {
    console.error('Кнопка або спіннер не знайдені!');
  }

  function startSpin() {
    button.classList.remove('spin');
    spinner.classList.add('wheel_spinner_animated_again');
    spinner.classList.remove('wheel_spinner_animated');
    setTimeout(() => {
      secondClickReady = true;
      button.classList.add('spin');
    }, 5000);
  }

  function finishSpin() {
    spinner.classList.remove('wheel_spinner_animated_again');
    spinner.classList.add('wheel_spinner_animated_1');
    button.classList.remove('spin');
    secondClickReady = false;
  }

  function showPopup() {
    if (overlay) {
      overlay.style.display = 'flex';
    }
  }

  window.closePopup = () => {
    if (overlay) {
      overlay.style.display = 'none';
    }
  };

  if (audioModal && acceptButton && declineButton) {
    audioModal.style.display = 'flex';
    acceptButton.addEventListener('click', async () => {
      isSoundAllowed = true;
      if (backgroundMusic) {
        try {
          await backgroundMusic.play();
        } catch (error) {
          console.error('Помилка при відтворенні фонової музики:', error);
        }
      }
      audioModal.style.display = 'none';
    });

    declineButton.addEventListener('click', () => {
      audioModal.style.display = 'none';
    });
  }

  function playSound(audioElementSelector) {
    const audioElement = document.querySelector(audioElementSelector);
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
      audioElement.play().catch(error => {
        console.error('Помилка при відтворенні звуку:', error);
      });
    }
  }
});