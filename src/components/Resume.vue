<template>
  <form
    @submit.prevent="submitResume"
    @dragenter.prevent="dragSwitcher"
    @dragleave.prevent="dragSwitcher"
  >
    <mdc-layout-grid class="content">
      <mdc-layout-cell span="8" ref="validatingEl">
        <mdc-layout-inner-grid>
          <CustomInput
            @emitText="getInputText"
            keyIndex="post"
            label="Должность"
            :isRequired="true"
            :isValid="isPostValid"
            :isFormReady="isFormReady"
            errorText="Введите название должности. Минимум 4 символа."
            ref="post"
          />

          <CustomInput @emitText="getInputText" keyIndex="city" label="Город"/>

          <mdc-layout-cell span="12" ref="employmentType">
            <EmploymentType @employmentTypes="getInputText" :isFormReady="isFormReady"/>
          </mdc-layout-cell>

          <CustomInput @emitText="getInputText" keyText="salary" label="Заработная плата"/>
        </mdc-layout-inner-grid>
      </mdc-layout-cell>

      <mdc-layout-cell span="4">
        <mdc-layout-inner-grid>
          <mdc-layout-cell span="11">
            <div
              class="drop"
              @dragover.prevent
              @drop.prevent.stop="onDrop"
              :class="{'hovered': isImageAreaHovered, 'no-pic': imgSrc || isImageAreaHovered}"
            >
              <label v-if="!imgSrc" class="mdc-button mdc-button--raised mdc-ripple-upgraded">
                Выберите изображение
                <input type="file" name="image" @change="onChange">
              </label>

              <div class="hidden" v-else :class="{ 'image': true }">
                <img :src="imgSrc" alt class="img">

                <mdc-button type="button" @click="removeImage" raised>Удалить</mdc-button>
              </div>
            </div>
          </mdc-layout-cell>
        </mdc-layout-inner-grid>
      </mdc-layout-cell>

      <mdc-layout-cell span="12" ref="categories">
        <mdc-title :class="{'invalid': !this.isCategoryValid && !this.isFormReady}">Категории</mdc-title>
        <mdc-caption
          :class="{'invalid': !this.isCategoryValid && !this.isFormReady}"
        >Выберите хотя бы одну категорию</mdc-caption>

        <v-select
          id="v-select"
          multiple
          v-model="selectedCategories"
          :options="selectedCategories.length < 4 ? categories: []"
          v-on:input="categoryLimiter"
          :class="{'invalid': !this.isCategoryValid && !this.isFormReady}"
        ></v-select>
      </mdc-layout-cell>

      <mdc-layout-cell span="12">
        <WorkExperience
          v-for="experience in experience"
          :key="experience.keyIndex"
          :haveTitle="experience.haveTitle"
          :keyIndex="experience.keyIndex"
          @experienceData="getExperienceData"
        />
        <mdc-button
          type="button"
          @click="addExperience"
          :disabled="experience.length > 5"
          raised
        >Добавить ещё одно место работы</mdc-button>
      </mdc-layout-cell>

      <mdc-layout-cell span="12">
        <Education
          v-for="education in education"
          :key="education.keyIndex"
          :haveTitle="education.haveTitle"
          :keyIndex="education.keyIndex"
          @educationData="getEducationData"
        />
        <mdc-button
          type="button"
          @click="addEducation"
          :disabled="education.length > 5"
          raised
        >Добавить ещё одно образование</mdc-button>
      </mdc-layout-cell>

      <mdc-layout-cell span="12">
        <mdc-title>Навыки</mdc-title>

        <v-select
          id="v-select"
          multiple
          v-model="selectedSkills"
          :options="selectedSkills.length < 4 ? skills: []"
          v-on:input="skillsLimiter"
        ></v-select>
      </mdc-layout-cell>

      <CustomInput
        @emitText="getInputText"
        :isMultiLine="true"
        keyIndex="additionalInfo"
        label="Дополнительная информация"
        :rows="5"
      />

      <mdc-layout-cell>
        <mdc-button type="submit" raised :disabled="!isRequiredFiledsValid">Сохранить</mdc-button>
      </mdc-layout-cell>
    </mdc-layout-grid>
  </form>
</template>

<script>
import CustomInput from "./CustomInput.vue";
import WorkExperience from "./WorkExperience.vue";
import Education from "./Education.vue";
import EmploymentType from "./EmploymentType.vue";
import vSelect from "vue-select";

export default {
  name: "hello",
  components: { CustomInput, WorkExperience, EmploymentType, Education },
  data() {
    return {
      post: "",
      city: "",
      employmentType: [],
      salary: "",
      categories: ["IT", "Маркетинг", "Тунеядство", "Промышленность", "Лень"],
      selectedCategories: [],
      experience: [
        {
          haveTitle: true,
          keyIndex: 0,
          company: "",
          city: "",
          post: "",
          period: "",
          duties: ""
        }
      ],
      education: [
        {
          haveTitle: true,
          keyIndex: 0,
          university: "",
          city: "",
          faculty: "",
          period: "",
          description: ""
        }
      ],
      skills: ["CSS", "HTML", "JS", "VueJs", "ReactJs", "AngularJs"],
      selectedSkills: [],
      additionalInfo: "",
      img: "",
      imgSrc: "",
      image: "",
      isImageAreaHovered: false,
      requiredFields: [
        {
          title: "должность",
          name: "post",
          isValid: false
        },
        {
          title: "категории",
          name: "categories",
          isValid: false
        },
        {
          title: "вид занятости",
          name: "employmentType",
          isValid: false
        }
      ],
      isFormReady: true
    };
  },
  methods: {
    getInputText(data) {
      this[data.keyIndex] = data.value;
    },
    getExperienceData(data) {
      this.experience[data.keyIndex].company = data.experience.company;
      this.experience[data.keyIndex].city = data.experience.city;
      this.experience[data.keyIndex].post = data.experience.post;
      this.experience[data.keyIndex].period = data.experience.period;
      this.experience[data.keyIndex].duties = data.experience.duties;
    },
    addExperience() {
      const keyIndex =
        this.experience.length > 1
          ? this.lastExperienceIndex + 1
          : this.lastExperienceIndex.keyIndex + 1;

      this.experience.push({
        haveTitle: false,
        keyIndex,
        company: "",
        city: "",
        post: "",
        period: "",
        duties: ""
      });
    },
    getEducationData(data) {
      this.education[data.keyIndex].university = data.education.university;
      this.education[data.keyIndex].city = data.education.city;
      this.education[data.keyIndex].faculty = data.education.faculty;
      this.education[data.keyIndex].period = data.education.period;
      this.education[data.keyIndex].description = data.education.description;
    },
    addEducation() {
      const keyIndex =
        this.education.length > 1
          ? this.educationIndex + 1
          : this.educationIndex.keyIndex + 1;
      this.education.push({
        haveTitle: false,
        keyIndex,
        university: "",
        city: "",
        faculty: "",
        period: "",
        description: ""
      });
    },
    categoryLimiter(e) {
      if (e.length > 4) {
        e.pop();
        this.$swal("Можно выбрать не более трёх категорий", "", "error");
      }
    },
    skillsLimiter(e) {
      if (e.length > 4) {
        e.pop();
        this.$swal("Можно выбрать не более трёх навыков", "", "error");
      }
    },
    dragSwitcher() {
      this.isImageAreaHovered = !this.isImageAreaHovered;
    },
    createFormData(file) {
      let formData = new FormData();
      formData.append("avatar", file);
      this.img = formData;
    },
    onDrop(e) {
      this.dragSwitcher();
      const files = e.dataTransfer.files;
      this.createImage(files[0]);
      this.createFormData(files[0]);
    },
    onChange(e) {
      this.imgSrc = "";
      const files = e.target.files || e.dataTransfer.files;
      const fileType = files[0].type.split("/");

      if (files.length && fileType[0] === "image") {
        this.createImage(files[0]);
        this.createFormData(files[0]);
      } else {
        this.$swal("Выберите изображение.", "", "error");
      }
    },
    createImage(file) {
      const reader = new FileReader();

      reader.onload = e => {
        this.imgSrc = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage() {
      this.imgSrc = "";
    },
    submitResume() {
      if (this.isRequiredFiledsValid) {
        this.isFormReady = true;
      } else {
        let firstItemOffsetTop = 0;
        if (this.nonValidFieldsNames.length > 1) {
          const minOffsetFieldName = this.nonValidFieldsNames.reduce(
            (prev, current) =>
              this.$refs[prev].$el.offsetTop < this.$refs[current].$el.offsetTop
                ? prev
                : current
          );
          firstItemOffsetTop =
            this.$refs[minOffsetFieldName].$el.offsetTop - 70;
        } else if (this.nonValidFieldsNames.length === 1) {
          firstItemOffsetTop =
            this.$refs[this.nonValidFieldsNames].$el.offsetTop - 70;
        }
        this.isFormReady = false;
        window.scrollTo({
            top: firstItemOffsetTop,
            behavior: 'smooth'
          })

        // this.$swal(
        //   `Заполните поля: ${this.nonValidFieldsTitles}`,
        //   "",
        //   "error"
        // ).then(() =>
        //   window.scrollTo({
        //     top: firstItemOffsetTop,
        //     behavior: "smooth"
        //   })
        // );
      }
    },
    setRequiredFieldsStatus(fieldName, isValid) {
      for (let i = 0; i < this.requiredFields.length; i++) {
        if (this.requiredFields[i].name === fieldName) {
          this.requiredFields[i].isValid = isValid;
          break;
        }
      }
    }
  },
  computed: {
    lastExperienceIndex() {
      return this.experience.reduce((max, input) =>
        max.keyIndex > input.keyIndex ? max.keyIndex : input.keyIndex
      );
    },
    educationIndex() {
      return this.education.reduce((max, input) =>
        max.keyIndex > input.keyIndex ? max.keyIndex : input.keyIndex
      );
    },
    isPostValid() {
      return this.post.length > 3;
    },
    isCategoryValid() {
      return this.selectedCategories.length > 0;
    },
    isEmploymentTypeValid() {
      return this.employmentType.length > 0;
    },
    isRequiredFiledsValid() {
      return this.requiredFields.every(field => field.isValid);
    },
    nonValidFields() {
      return this.requiredFields.filter(field => !field.isValid);
    },
    nonValidFieldsTitles() {
      return this.nonValidFields.map(field => field.title);
    },
    nonValidFieldsNames() {
      return this.nonValidFields.map(field => field.name);
    }
  },
  watch: {
    post() {
      this.setRequiredFieldsStatus("post", this.isPostValid);
    },
    selectedCategories() {
      this.setRequiredFieldsStatus("categories", this.isCategoryValid);
    },
    employmentType() {
      this.setRequiredFieldsStatus(
        "employmentType",
        this.isEmploymentTypeValid
      );
    }
  }
};
</script>

<style scoped>
.content {
  box-sizing: border-box;
  min-width: 100px;
  max-width: 800px;
  margin: auto;
  padding: 30px 15px;
}

.btn-file input[type="file"] {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  font-size: 100px;
  text-align: right;
  filter: alpha(opacity=0);
  opacity: 0;
  outline: none;
  background: white;
  cursor: inherit;
  display: block;
}

input[type="file"] {
  position: absolute;
  left: 0;
  z-index: -1;

  opacity: 0;
}

.hidden {
  display: none;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

.hidden.image {
  display: flex;
}

.img {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.drop {
  position: relative;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: flex-end;
  box-sizing: border-box;
  width: 100%;
  max-width: 600px;
  height: 300px;
  padding-bottom: 15px;
  margin-bottom: 15px;

  border: 4px dashed #ccc;
  background-color: #f6f6f6;
  border-radius: 2px;
}

.drop::before {
  content: "";
  position: absolute;
  top: 50%;
  transform: translateY(-70%);
  z-index: 2;

  width: 100px;
  height: 100px;

  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU4IDU4IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1OCA1ODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwYXRoIGQ9Ik01Nyw2SDFDMC40NDgsNiwwLDYuNDQ3LDAsN3Y0NGMwLDAuNTUzLDAuNDQ4LDEsMSwxaDU2YzAuNTUyLDAsMS0wLjQ0NywxLTFWN0M1OCw2LjQ0Nyw1Ny41NTIsNiw1Nyw2eiBNNTYsNTBIMlY4aDU0VjUweiIvPjxwYXRoIGQ9Ik0xNiwyOC4xMzhjMy4wNzEsMCw1LjU2OS0yLjQ5OCw1LjU2OS01LjU2OEMyMS41NjksMTkuNDk4LDE5LjA3MSwxNywxNiwxN3MtNS41NjksMi40OTgtNS41NjksNS41NjlDMTAuNDMxLDI1LjY0LDEyLjkyOSwyOC4xMzgsMTYsMjguMTM4eiBNMTYsMTljMS45NjgsMCwzLjU2OSwxLjYwMiwzLjU2OSwzLjU2OVMxNy45NjgsMjYuMTM4LDE2LDI2LjEzOHMtMy41NjktMS42MDEtMy41NjktMy41NjhTMTQuMDMyLDE5LDE2LDE5eiIvPjxwYXRoIGQ9Ik03LDQ2YzAuMjM0LDAsMC40Ny0wLjA4MiwwLjY2LTAuMjQ5bDE2LjMxMy0xNC4zNjJsMTAuMzAyLDEwLjMwMWMwLjM5MSwwLjM5MSwxLjAyMywwLjM5MSwxLjQxNCwwczAuMzkxLTEuMDIzLDAtMS40MTRsLTQuODA3LTQuODA3bDkuMTgxLTEwLjA1NGwxMS4yNjEsMTAuMzIzYzAuNDA3LDAuMzczLDEuMDQsMC4zNDUsMS40MTMtMC4wNjJjMC4zNzMtMC40MDcsMC4zNDYtMS4wNC0wLjA2Mi0xLjQxM2wtMTItMTFjLTAuMTk2LTAuMTc5LTAuNDU3LTAuMjY4LTAuNzItMC4yNjJjLTAuMjY1LDAuMDEyLTAuNTE1LDAuMTI5LTAuNjk0LDAuMzI1bC05Ljc5NCwxMC43MjdsLTQuNzQzLTQuNzQzYy0wLjM3NC0wLjM3My0wLjk3Mi0wLjM5Mi0xLjM2OC0wLjA0NEw2LjMzOSw0NC4yNDljLTAuNDE1LDAuMzY1LTAuNDU1LDAuOTk3LTAuMDksMS40MTJDNi40NDcsNDUuODg2LDYuNzIzLDQ2LDcsNDZ6Ii8+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjwvc3ZnPg==);
  opacity: 0.5;
}

.no-pic::before {
  background-image: none;
  opacity: 1;
}

.hovered::before {
  content: "Перетащите изображение сюда";
  width: auto;
  transform: translateY(-30%);
  font-family: "Roboto", sans-serif;
}

.drop label {
  margin-bottom: 0;
  text-align: center;
}
</style>

