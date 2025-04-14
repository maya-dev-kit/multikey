
# 🚀 `mfe-multikey` – Multi-Instance MFE Demo for Maya

This Maya MFE demonstrates **how to instantiate the same MFE multiple times** using different `key` values. Each instance manages **isolated state and view logic**, showcasing Maya's ability to scope stores per `key`, allowing independent behavior across dynamic instances.

---

## 🧩 Overview

### ✨ What This MFE Demonstrates

- ✅ **Multi-Instance MFE Rendering** using separate `key` values (`alpha`, `beta`)
- ✅ **Scoped Store State** per instance
- ✅ **Slot-based Composition** to render MFEs side-by-side
- ✅ **Interactive Inputs** with isolated updates via `maya-input` and store `self` data
- ✅ **Independent Event Dispatch** through `operationId`-based `maya-button`

---

## 📂 File Structure

```
/mfe/multikey/
│
├── js/
│   └── index.js         # MFE logic, store, lifecycle
│
├── view/
│   ├── main.html        # Hosts the slots for child MFEs
│   └── detail.html      # The per-instance card layout
```

---

## 🧠 How It Works

### 🔁 `main.html` (Parent MFE)

```html
<maya-slot name="target1"></maya-slot>
<maya-slot name="target2"></maya-slot>
```

> This view defines **two named slots**. Each slot will receive a dynamically loaded instance of the same MFE with a different `key`.

---

### 🎮 `index.js` (MFE Logic)

```js
Maya.Store.multikey = { /* ... */ }
```

- **onLoad**: Loads default data for either `alpha` or `beta` instance.
- **updateName**: Updates the instance’s name from the self-bound input.

```js
Maya.Load('multikey/detail?key=alpha&target=target1');
Maya.Load('multikey/detail?key=beta&target=target2');
```

> The `onRender` hook dynamically loads `detail.html` into both slots, using unique keys to isolate each instance.

---

### 🖼️ `detail.html` (Instance View)

Displays each instance's values and allows editing the `name` via input.

#### Used Components:

| Component           | Purpose                                                                 |
|---------------------|-------------------------------------------------------------------------|
| `<maya-input>`      | Binds to `self[key][name]`, syncing user input to store self-state      |
| `<albert-uibutton>` | Triggers store events like `updateName` using `operationId`             |
| `<maya-slot>`       | Creates anchor points for rendering child MFEs (from `main.html`)       |

---

## 🎯 Key Concepts

| Concept       | Description                                                                 |
|---------------|-----------------------------------------------------------------------------|
| `key`         | A **unique identifier per instance**, used to scope `store.data[key]`       |
| `maya-input`  | Syncs user input to `store.self[key][name]`, enabling scoped binding        |
| `operationId` | Dispatches events like `updateName`, which fetches `self.name` via `key`    |
| Slots         | Enable nesting MFEs into well-defined locations dynamically                 |

---

## 🧪 Try It Out

When this MFE is rendered:

- **Two separate cards** appear.
- You can **edit the name** in either one.
- Clicking **Update** triggers a scoped `SetData` using the specific `key`, proving **MFE isolation**.

---

## 💡 Why This Matters

This MFE is a **practical pattern** in Maya when:

- You need to repeat a form/card layout many times
- Each needs its **own state**
- You want **one MFE, multiple behaviors**

---

## 🛠️ Maya Components Used

- **`<maya-slot>`** – Dynamic layout anchors
- **`<maya-input>`** – One-way data binding to store `self`
- **`<albert-uibutton>`** – Event dispatcher via `operationId`
- **`Maya.Store.SetData`** – Triggers view updates scoped by key
- **`Maya.Load()`** – Loads MFEs dynamically into slots without full reload

---

## ✅ Naming

- **MFE Name**: `multikey`
- **Custom Element**: `<albert-multikey>`
- **Store Name**: `multikey`

> All aligned to Maya's **lowercase, hyphenless** naming convention.

---

## 📦 Deployment Tips

- Use **version.json** to track deployment changes
- Declare `multikey` in your `maya-maya` HTML with:
  ```html
  <albert-multikey slot="main"></albert-multikey>
  ```
- No extra dependencies required
