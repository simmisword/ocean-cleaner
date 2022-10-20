import { map, MIN_YEAR, MAX_YEAR } from "../utils";

function addEvents(waterScene) {
  const slider = document.querySelector("#year-range");
  const yearLabel_1 = document.querySelector("#year-range-lb-1");
  const yearLabel_2 = document.querySelector("#year-range-lb-2");
  const collectButton = document.querySelector("#collect-button");
  const infobutton = document.querySelector("#info-button");
  const playButton = document.querySelector("#play-button");
  const modeButton = document.querySelector("#mode-button");

  // activateButton(collectButton);
  // updateTrash();

  // slider.addEventListener("input", updateTrash());

  // infobutton.addEventListener("click", openInformation);

  // collectButton.addEventListener("click", switchCollect);

  // window.addEventListener("wheel", function (event) {
  //   slider.value = parseInt(slider.value) - parseInt(event.deltaY * 0.000001);

  //   if (event.deltaY > 0) {
  //     slider.value -= 1;
  //   } else if (event.deltaY < 0) {
  //     slider.value = parseInt(slider.value) + 1;
  //   }

  //   updateTrash();
  // });

  // function updateTrash() {
  //   waterScene.updateTrash(sliderToYear(slider.value));
  //   const year = new String(sliderToYear(slider.value));
  //   yearLabel_1.innerHTML = year.slice(0, 2);
  //   yearLabel_2.innerHTML = year.slice(2, 4);
  // }

  // playButton.addEventListener(
  //   "click",
  //   () => {
  //     // Check if context is in suspended state (autoplay policy)
  //     if (waterScene.audioPlayer.audioCtx.state === "suspended") {
  //       waterScene.audioPlayer.audioCtx.resume();
  //     }

  //     // Play or pause track depending on state
  //     if (playButton.dataset.playing === "false") {
  //       waterScene.audioPlayer.play();
  //       playButton.dataset.playing = "true";
  //     } else if (playButton.dataset.playing === "true") {
  //       waterScene.audioPlayer.pause();
  //       playButton.dataset.playing = "false";
  //     }
  //   },
  //   false
  // );

  function switchCollect() {
    if (waterScene.collectTrash) {
      waterScene.collectTrash = 0;
      waterScene.scene.remove(waterScene.boat.boat);
      deactivateButton(collectButton);
    } else {
      waterScene.collectTrash = 1;
      waterScene.scene.add(waterScene.boat.boat);
      activateButton(collectButton);
    }
  }

  function openInformation() {
    var infoContainer = document.querySelector("#info");
    var visibility = infoContainer.style.visibility;

    if (visibility != "hidden") {
      infoContainer.style.visibility = "hidden";
      deactivateButton(infobutton);
    } else {
      infoContainer.style.visibility = "visible";
      activateButton(infobutton);
    }
  }
}

function deactivateButton(button) {
  button.style.removeProperty("background-color");
  button.style.removeProperty("color");
}

function activateButton(button) {
  button.style.backgroundColor = "white";
  button.style.color = "#786563";
}

function sliderToYear(value) {
  return map(value, 0, 100, MAX_YEAR, MIN_YEAR) | 0;
}

export { addEvents };
