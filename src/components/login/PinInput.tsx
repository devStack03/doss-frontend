import { useEffect } from 'react';
// import './pin-input.css';

const PinInput = () => {

  useEffect(() => {
    let in1 = document.getElementById('otc-1') as HTMLInputElement,
      ins = document.querySelectorAll('input[type="number"]');
    const splitNumber = (e: any) => {
      let data = e.data || e.target.value; // Chrome doesn't get the e.data, it's always empty, fallback to value then.
      if (!data) return; // Shouldn't happen, just in case.
      if (data.length === 1) return; // Here is a normal behavior, not a paste action.

      popuNext(e.target, data);
      //for (i = 0; i < data.length; i++ ) { ins[i].value = data[i]; }
    };
    const popuNext = (el: any, data: any) => {
      el.value = data[0]; // Apply first item to first input
      data = data.substring(1); // remove the first char.
      if (el.nextElementSibling && data.length) {
        // Do the same with the next element and next data
        popuNext(el.nextElementSibling, data);
      }
    };

    ins.forEach(function (input) {
      /**
       * Control on keyup to catch what the user intent to do.
       * I could have check for numeric key only here, but I didn't.
       */
      input.addEventListener('keyup', function (e: any) {
        // Break if Shift, Tab, CMD, Option, Control.
        if (e.keyCode === 16 || e.keyCode == 9 || e.keyCode == 224 || e.keyCode == 18 || e.keyCode == 17) {
          return;
        }

        // On Backspace or left arrow, go to the previous field.
        if ((e.keyCode === 8 || e.keyCode === 37) && e.target.previousElementSibling && e.target.previousElementSibling.tagName === "INPUT") {
          e.target.previousElementSibling.select();
        } else if (e.keyCode !== 8 && e.target.nextElementSibling) {
          e.target.nextElementSibling.select();
        }

        // If the target is populated to quickly, value length can be > 1
        if (e.target.value.length > 1) {
          splitNumber(e);
        }
      });

      /**
       * Better control on Focus
       * - don't allow focus on other field if the first one is empty
       * - don't allow focus on field if the previous one if empty (debatable)
       * - get the focus on the first empty field
       */
      input.addEventListener('focus', function (e: any) {
        // If the focus element is the first one, do nothing
        if (e.target === in1) return;

        // If value of input 1 is empty, focus it.
        if (in1?.value == '') {
          in1.focus();
        }

        // If value of a previous input is empty, focus it.
        // To remove if you don't wanna force user respecting the fields order.
        if (e.target.previousElementSibling.value == '') {
          e.target.previousElementSibling.focus();
        }
      });
    });

    /**
     * Handle copy/paste of a big number.
     * It catches the value pasted on the first field and spread it into the inputs.
     */
    in1.addEventListener('input', splitNumber);
  })

  return (
    <form className="otc" name="one-time-code" action="#">
      <fieldset>
        <div>
          <input type="number" pattern="[0-9]*" inputMode="numeric" autoComplete="one-time-code" id="otc-1" required />
          <input type="number" pattern="[0-9]*" min="0" max="9" maxLength={1}  inputMode="numeric" id="otc-2" required />
          <input type="number" pattern="[0-9]*" min="0" max="9" maxLength={1}  inputMode="numeric" id="otc-3" required />
          <input type="number" pattern="[0-9]*" min="0" max="9" maxLength={1}  inputMode="numeric" id="otc-4" required />
          <input type="number" pattern="[0-9]*" min="0" max="9" maxLength={1}  inputMode="numeric" id="otc-5" required />
          <input type="number" pattern="[0-9]*" min="0" max="9" maxLength={1}  inputMode="numeric" id="otc-6" required />
        </div>
      </fieldset>
    </form>
  )
};

export default PinInput;