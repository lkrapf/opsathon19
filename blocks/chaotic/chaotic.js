export default async function decorate(block) {
  const replContainer = document.createElement('div');
  replContainer.classList.add('repl-container');

  const inputForm = document.createElement('form');
  inputForm.id = 'repl-form';
  inputForm.innerHTML = `
    <label for="repl-input">JS REPL:</label>
    <input type="text" id="repl-input" name="repl-input" size="60" autocomplete="off" />
    <button type="submit">Run</button>
  `;

  const outputArea = document.createElement('pre');
  outputArea.id = 'repl-output';
  outputArea.style.marginTop = '1em';

  inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = inputForm.querySelector('#repl-input').value;
    let result;
    try {
      result = eval(input);
    } catch (err) {
      result = err.toString();
    }
    outputArea.textContent = String(result);
  });

  replContainer.appendChild(inputForm);
  replContainer.appendChild(outputArea);
  block.append(replContainer);
}
