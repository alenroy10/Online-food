const foodInputs = document.querySelectorAll('input[name="food"]');
const totalElement = document.getElementById('total');
const selectedItemsElement = document.getElementById('selected-items');
const orderForm = document.getElementById('order-form');
const messageElement = document.getElementById('message');

function calculateTotal() {
  const selected = Array.from(foodInputs).filter((item) => item.checked);
  const total = selected.reduce((sum, item) => sum + Number(item.value), 0);

  totalElement.textContent = `₹${total}`;
  if (selected.length === 0) {
    selectedItemsElement.textContent = 'No items selected yet.';
  } else {
    const list = document.createElement('ul');
    selected.forEach((item) => {
      const row = document.createElement('li');
      row.textContent = `${item.dataset.name} — ₹${Number(item.value)}`;
      list.appendChild(row);
    });
    selectedItemsElement.replaceChildren(list);
  }
  messageElement.textContent = '';
  messageElement.className = 'message';
  return { selected, total };
}

foodInputs.forEach((item) => item.addEventListener('change', calculateTotal));

orderForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const { selected, total } = calculateTotal();

  messageElement.className = 'message error';
  if (selected.length === 0) {
    messageElement.textContent = 'Please select at least one food item.';
    return;
  }
  if (!name) {
    messageElement.textContent = 'Please enter your name.';
    document.getElementById('name').focus();
    return;
  }
  if (!phone) {
    messageElement.textContent = 'Please enter your phone number.';
    document.getElementById('phone').focus();
    return;
  }
  if (!/^[+\d][\d\s()-]{6,18}\d$/.test(phone)) {
    messageElement.textContent = 'Please enter a valid phone number.';
    document.getElementById('phone').focus();
    return;
  }

  messageElement.className = 'message success';
  messageElement.textContent = `Order placed successfully! Thank you, ${name}. Your demo order total is ₹${total}.`;
  orderForm.querySelector('button[type="submit"]').textContent = 'Order placed ✓';
});
