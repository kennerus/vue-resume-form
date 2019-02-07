<template>
  <mdc-layout-app id="app">
    <toolbar slot="toolbar"/>
    <main class="main">
      <Resume/>
    </main>
  </mdc-layout-app>
</template>

<script>
import Toolbar from "../../components/toolbar.vue";
import Resume from "../../components/Resume.vue";

export default {
  name: "app",
  components: { Toolbar, Resume }
};
</script>

<style>
.mr15 {
  margin-right: 15px;
}

.mdc-layout-app--main-container {
  position: relative;
  z-index: 1;
}

.main .mdc-text-field--fullwidth .mdc-text-field__input {
  resize: none;
}

.mdc-text-field--textarea {
  box-sizing: border-box;
}

#v-select, #v-select-2 {
  border: 1px solid transparent;
  border-radius: 5px;
}

#v-select .dropdown-toggle,
#v-select .dropdown-menu,
#v-select-2 .dropdown-toggle,
#v-select-2 .dropdown-menu {
  border-color: rgba(0, 0, 0, 0.73);
}

#v-select.open,
#v-select-2.open {
  border-color: #6200ee;
  border-color: var(--mdc-theme-primary, #6200ee);

  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

#v-select.open .dropdown-toggle,
#v-select.open .dropdown-menu,
#v-select-2.open .dropdown-toggle,
#v-select-2.open .dropdown-menu {
  caret-color: #6200ee;
  caret-color: var(--mdc-theme-primary, #6200ee);
  border-color: #6200ee;
  border-color: var(--mdc-theme-primary, #6200ee);
  border-bottom-color: transparent;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

#v-select.open .dropdown-menu,
#v-select-2.open .dropdown-menu {
  top: calc(100% - 1px);
  left: -1px;
  width: calc(100% + 2px);
  border-width: 2px;
  border-bottom-color: #6200ee;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 10px;
}

#v-select .dropdown-toggle:focus,
#v-select-2 .dropdown-toggle:focus {
  border-width: 2px;
}

#v-select.invalid,
#v-select.invalid .dropdown-toggle,
#v-select.invalid .dropdown-menu,
#v-select-2.invalid,
#v-select-2.invalid .dropdown-toggle,
#v-select-2.invalid .dropdown-menu {
  border-color: #b00020;
}

.invalid,
.main .invalid .mdc-textfield .mdc-text-field__input {
  color: #b00020;
  caret-color: #b00020;
}

.invalid::placeholder,
.main .invalid .mdc-textfield .mdc-text-field__input,
.main .invalid .mdc-textfield .mdc-text-field__input::placeholder  {
  color: #b00020;
}

.main .invalid .mdc-line-ripple--active {
  border-bottom-color: #b00020;
  background-color: #b00020;
}

.swal2-popup .swal2-title {
  font-size: 1.5rem;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  letter-spacing: 0.0125em;
}
</style>
