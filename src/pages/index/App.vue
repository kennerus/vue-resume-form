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

.mt20 {
  margin-top: 20px !important;
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

.v-select-custom {
  border: 1px solid transparent !important;
  border-radius: 5px !important;
}

.v-select-custom .dropdown-toggle,
.v-select-custom .dropdown-menu {
  border-color: rgba(0, 0, 0, 0.73) !important;
}

.v-select-custom.open {
  border-color: #6200ee !important;
  border-color: var(--mdc-theme-primary, #6200ee) !important;

  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.v-select-custom.open .dropdown-toggle,
.v-select-custom.open .dropdown-menu {
  caret-color: #6200ee  !important;
  caret-color: var(--mdc-theme-primary, #6200ee)  !important;
  border-color: #6200ee  !important;
  border-color: var(--mdc-theme-primary, #6200ee)  !important;
  border-bottom-color: transparent  !important;
  border-bottom-left-radius: 0  !important;
  border-bottom-right-radius: 0  !important;
}

.v-select-custom.open .dropdown-menu {
  top: calc(100% - 1px) !important;
  left: -1px !important;
  width: calc(100% + 2px) !important;
  border-width: 2px !important;
  border-bottom-color: #6200ee !important;
  border-bottom-left-radius: 5px !important;
  border-bottom-right-radius: 10px !important;
}

.v-select-custom .dropdown-toggle:focus {
  border-width: 2px !important;
}

.v-select-custom.invalid,
.v-select-custom.invalid .dropdown-toggle,
.v-select-custom.invalid .dropdown-menu {
  border-color: #b00020 !important;
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
