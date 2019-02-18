<template>
  <form
    @submit.prevent="submitResume"
    @dragenter.prevent="dragSwitcher"
    @dragleave.prevent="dragSwitcher"
  >
    <mdc-layout-grid class="content">
      <mdc-layout-cell span="8" class="main-fields">
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

          <mdc-layout-cell span="12" ref="categories">
            <mdc-title :class="{'invalid': !this.isCategoryValid && !this.isFormReady}">Категории</mdc-title>
            <mdc-caption
              :class="{'invalid': !this.isCategoryValid && !this.isFormReady}"
            >Выберите хотя бы одну категорию</mdc-caption>

            <v-select
              id="v-select"
              class="v-select-custom"
              multiple
              v-model="selectedCategories"
              :options="selectedCategories.length < 4 ? categories: []"
              v-on:input="categoryLimiter"
              :class="{'invalid': !this.isCategoryValid && !this.isFormReady}"
            ></v-select>
          </mdc-layout-cell>

          <mdc-layout-cell span="12">
            <mdc-title>Владение языками</mdc-title>
            <mdc-button
              type="button"
              @click="addLanguage"
              v-if="selectedLanguages.length < 5"
              raised
            >
              Добавить ещё один язык (не больше 5)
            </mdc-button>
            <LanguageLevel
              v-for="item in selectedLanguages"
              :key="item.keyIndex"
              :keyIndex="item.keyIndex"
              @selectedLanguage="selectedLanguageHandler"
            />
          </mdc-layout-cell>

          <mdc-layout-cell span="12">
            <mdc-title>Навыки</mdc-title>

            <v-select
              id="v-select-2"
              class="v-select-custom"
              multiple
              v-model="selectedSkills"
              :options="selectedSkills.length < 4 ? skills: []"
              v-on:input="skillsLimiter"
            ></v-select>
          </mdc-layout-cell>

          <mdc-layout-cell span="12">
            <mdc-button
              type="button"
              @click="isExperienceHidden = !isExperienceHidden"
              outlined
            >{{experienceToggleText}}</mdc-button>

            <mdc-layout-cell v-if="!isExperienceHidden">
              <WorkExperience
                v-for="experience in experience"
                :key="experience.keyIndex"
                :title="experience.haveTitle"
                :removeBtn="experience.removeBtn"
                :keyIndex="experience.keyIndex"
                @experienceIndex="removeExperience"
                @experienceData="getExperienceData"
              />
              <mdc-button
                type="button"
                @click="addExperience"
                v-if="experience.length < 5"
                raised
              >Добавить ещё одно место работы</mdc-button>
            </mdc-layout-cell>
          </mdc-layout-cell>

          <mdc-layout-cell span="12">
            <mdc-button
              type="button"
              @click="isEducationHidden = !isEducationHidden"
              outlined
            >
              {{educationToggleText}}
            </mdc-button>

            <mdc-layout-cell v-if="!isEducationHidden">
              <Education
                v-for="education in education"
                :key="education.keyIndex"
                :title="education.haveTitle"
                :removeBtn="education.removeBtn"
                :keyIndex="education.keyIndex"
                @educationIndex="removeEducation"
                @educationData="getEducationData"
              />
              <mdc-button
                type="button"
                @click="addEducation"
                v-if="education.length < 5"
                raised
              >Добавить ещё одно образование</mdc-button>
            </mdc-layout-cell>
          </mdc-layout-cell>

          <CustomInput
            @emitText="getInputText"
            :isMultiLine="true"
            keyIndex="additionalInfo"
            label="Дополнительная информация"
            :rows="5"
          />
        </mdc-layout-inner-grid>
      </mdc-layout-cell>

      <mdc-layout-cell span="4" tablet="12" class="file-upload">
        <file-pond
          name="test"
          class-name="my-pond"
          label-idle="Перетащите файлы сюда"
          allow-multiple="true"
          accepted-file-types="image/jpeg, image/png"
          allow-file-size-validation="true"
          max-file-size="5MB"
          labelMaxFileSizeExceeded
          labelMaxFileSize="Макс. размер 3Мб"
          data-max-files="5"
          :files="myFiles"
          ref="pond"
        />
      </mdc-layout-cell>
    </mdc-layout-grid>

    <mdc-layout-grid class="content">
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
import LanguageLevel from "./LanguageLevel.vue";
import vSelect from "vue-select";
import vueFilePond from "vue-filepond";

// Import plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js";
import FilePondPluginImagePreview from "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size/dist/filepond-plugin-file-validate-size.esm.js";
// Create FilePond component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize
);

export default {
  name: "hello",
  components: {
    CustomInput,
    WorkExperience,
    EmploymentType,
    Education,
    FilePond,
    LanguageLevel
  },
  data() {
    return {
      myFiles: [],
      post: "",
      city: "",
      employmentType: [],
      salary: "",
      categories: ["IT", "Маркетинг", "Тунеядство", "Промышленность", "Лень"],
      selectedCategories: [],
      experience: [
        {
          title: "Опыт работы",
          removeBtn: false,
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
          title: "Образование",
          removeBtn: false,
          keyIndex: 0,
          university: "",
          city: "",
          faculty: "",
          period: "",
          description: ""
        }
      ],
      languagesKnowledge: [0],
      selectedLanguages: [
        {
          language: "",
          skillLevel: "",
          keyIndex: 0
        }
      ],
      isEducationHidden: false,
      isExperienceHidden: false,
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
        title: "Дополнительный опыт",
        removeBtn: true,
        keyIndex,
        company: "",
        city: "",
        post: "",
        period: "",
        duties: ""
      });
    },
    removeExperience(index) {
      this.experience = this.experience.filter(
        experience => experience.keyIndex !== index
      );
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
        title: "Дополнительное образование",
        removeBtn: true,
        keyIndex,
        university: "",
        city: "",
        faculty: "",
        period: "",
        description: ""
      });
    },
    removeEducation(index) {
      this.education = this.education.filter(
        education => education.keyIndex !== index
      );
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
          behavior: "smooth"
        });
      }
    },
    setRequiredFieldsStatus(fieldName, isValid) {
      for (let i = 0; i < this.requiredFields.length; i++) {
        if (this.requiredFields[i].name === fieldName) {
          this.requiredFields[i].isValid = isValid;
          break;
        }
      }
    },
    addLanguage() {
      const keyIndex =
        this.selectedLanguages.length > 1
          ? this.languageIndex + 1
          : 1;

      console.log(this.selectedLanguages.length);
      console.log(keyIndex);
      this.selectedLanguages.push({
        language: "",
        skillLevel: '',
        keyIndex
      })
    },
    selectedLanguageHandler(data) {
      this.selectedLanguages[data.keyIndex].language = data.language;
      this.selectedLanguages[data.keyIndex].skillLevel = data.skillLevel;
    }
  },
  computed: {
    handleFilePondInit() {
      console.log("FilePond has initialized");

      // example of instance method call on pond reference
      // this.$refs.pound.getFiles();
    },
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
    languageIndex() {
      return this.selectedLanguages.reduce((max, input) => {
        console.log(max)
        return max.keyIndex > input.keyIndex ? max.keyIndex : input.keyIndex
        }
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
    nonValidFieldsNames() {
      return this.nonValidFields.map(field => field.name);
    },
    educationToggleText() {
      return this.isEducationHidden
        ? "Развернуть образование"
        : "Свернуть образование";
    },
    experienceToggleText() {
      return this.isExperienceHidden
        ? "Развернуть опыт работы"
        : "Свернуть опыт работы";
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
  max-width: 960px;
  margin: auto;
  padding: 30px 15px;
}

@media (max-width: 839px) {
  .main-fields {
    order: 2;
  }

  .file-upload {
    order: 1;
  }
}
</style>

