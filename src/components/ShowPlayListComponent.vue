<template>
  <div class="full-width-table">
    <h1 class="green text-center">PlayLists</h1>

    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="PlayList name" v-model="nameForSearch"
        aria-label="Recipient's username" aria-describedby="basic-addon2">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" @click="searchPlayListByName()" type="button"><svg
            xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
            viewBox="0 0 16 16">
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg></button>
        <button class="btn btn-outline-secondary" @click="getAllPlayList()" type="button"><svg
            xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-arrow-left-square-fill" viewBox="0 0 16 16">
            <path
              d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1" />
          </svg></button>
      </div>
    </div>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope=" col" v-for="(title, index) in titlesPlayList" :key="index">{{ title }}</th>
          <th scope=" col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(values, index) in valuesPlayList" :key="index">
          <th scope="row">
            {{ values.id }}
          </th>
          <td>
            {{ values.name }}
          </td>
          <td>
            {{ values.description }}
          </td>
          <td>
            <button class="btn btn-primary" @click="viewSongs(values.songs, values.name)"> view songs</button>
          </td>

          <td>
            <button class="btn btn-danger" :disabled="isLoadingButton" @click="deletePlayList(values.name)">
              <span>delete playList</span>
            </button>
            <span class="loader" v-if="false" :id="'loading' + values.id"></span>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
  <div class="centered-table text-center" v-if="isShowTable">
    <h4>{{ namePlayList }}</h4>
    <table class="table small-table">
      <thead class="thead-dark">
        <tr>
          <th scope="col" v-for="(title, index) in titleSongsPlayList" :key="index">{{ title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(song, index) in listOfSongs" :key="index">
          <th scope="row">
            {{ song.id }}
          </th>
          <td>
            {{ song.title }}
          </td>
          <td>
            {{ song.artist }}
          </td>
          <td>
            {{ song.album }}
          </td>
          <td>
            {{ song.year }}
          </td>
          <td>
            {{ song.genre }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="centered-button "><button class="btn btn-success" @click="showFormCreatePlayList()"> create playList
    </button></div>

  <div class="container mt-5" v-if="isShowForm">
    <h2>Create PlayList</h2>
    <form @submit.prevent="submitForm">
      <!-- Campos para Nombre y Descripción -->
      <div class="mb-3">
        <label for="name" class="form-label">Name of PlayList</label>
        <input type="text" class="form-control" id="name" v-model="playlist.name" required>
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea class="form-control" id="description" v-model="playlist.description" rows="3" required></textarea>
      </div>

      <h3>Songs</h3>
      <div v-for="(song, index) in playlist.songs" :key="index" class="mb-3 border p-3 rounded">
        <div class="mb-2">
          <label class="form-label">Title of song</label>
          <input type="text" class="form-control" v-model="song.title" required>
        </div>
        <div class="mb-2">
          <label class="form-label">Artist</label>
          <input type="text" class="form-control" v-model="song.artist" required>
        </div>
        <div class="mb-2">
          <label class="form-label">Album</label>
          <input type="text" class="form-control" v-model="song.album" required>
        </div>
        <div class="mb-2">
          <label class="form-label">Year</label>
          <input type="number" class="form-control" v-model="song.year" required>
        </div>
        <div class="mb-2">
          <label class="form-label">Genre</label>
          <input type="text" class="form-control" v-model="song.genre" required>
        </div>
        <button type="button" class="btn btn-danger mt-2" @click="removeSong(index)">Delete song</button>
      </div>

      <button type="button" class="btn btn-secondary mb-3" @click="addSong">add song</button>
      <br>
      <button type="submit" class="btn btn-primary">Save PlayList <svg xmlns="http://www.w3.org/2000/svg" width="16"
          height="16" fill="currentColor" class="bi bi-floppy-fill" viewBox="0 0 16 16">
          <path
            d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z" />
          <path
            d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z" />
        </svg></button>
    </form>
  </div>
</template>

<script>
import * as requestHandler from "@/utils/services/ServicesHandler.js";
import { onMounted, ref } from "vue";


export default {
  name: "ShowPlayListComponent",
  setup() {
    const titlesPlayList = ref();
    const valuesPlayList = ref();
    const titleSongsPlayList = ref();
    const namePlayList = ref();
    const isShowTable = ref(false);
    const isLoadingButton = ref(false);
    const listOfSongs = ref();
    const nameForSearch = ref("");
    const isShowForm = ref(false);
    const playlist = ref({
      name: '',
      description: '',
      songs: [
        {
          title: '',
          artist: '',
          album: '',
          year: '',
          genre: ''
        }
      ]
    });

    const addSong = () => {
      playlist.value.songs.push({
        title: '',
        artist: '',
        album: '',
        year: '',
        genre: ''
      });
    };

    const removeSong = (index) => {
      playlist.value.songs.splice(index, 1);
    };

    const submitForm = async () => {
      console.log(playlist.value);
      await requestHandler.playListServices.savePlayList(playlist.value);
      isShowForm.value = false;
      getAllPlayList();
    };



    const getAllPlayList = async () => {
      const response = await requestHandler.playListServices.getAllPlayLists();

      titlesPlayList.value = [...Object.keys(response.data[0])];
      valuesPlayList.value = [...response.data];

      isLoadingButton.value = false;

    };

    const viewSongs = (songs, name) => {
      isShowTable.value = !isShowTable.value;
      console.log(name);
      namePlayList.value = name;
      titleSongsPlayList.value = [...Object.keys(songs[0])];
      listOfSongs.value = [...songs];

    }

    const deletePlayList = async (name) => {
      isLoadingButton.value = true;
      await requestHandler.playListServices.deletePlayList(name);
      getAllPlayList();

    }
    const showFormCreatePlayList = () => {
      isShowForm.value = !isShowForm.value;
    }


    const searchPlayListByName = async () => {
      const response = await requestHandler.playListServices.getPlayListByName(nameForSearch.value);
      let auxArr = []
      auxArr.push(response.data);
      titlesPlayList.value = [...Object.keys(response.data)];
      valuesPlayList.value = auxArr;
      console.log(valuesPlayList.value);

    }

    onMounted(() => {
      getAllPlayList();
    });

    return {
      titlesPlayList,
      valuesPlayList,
      listOfSongs,
      namePlayList,
      titleSongsPlayList,
      isShowTable,
      isLoadingButton,
      nameForSearch,
      playlist,
      isShowForm,
      viewSongs,
      getAllPlayList,
      deletePlayList,
      searchPlayListByName,
      addSong,
      removeSong,
      submitForm,
      showFormCreatePlayList

    }
  }
}
</script>
<style>
body,
html {
  height: 100%;
  margin: 0;
}

.centered-table {
  justify-content: center;
  align-items: center;
  height: 100%;
}

.small-table {
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
}

.full-width-table {
  width: 100%;
  margin: 0;
}

.table {
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 8px;
  text-align: left;
}

.centered-button {
  justify-content: center;
  align-items: center;
  height: 100%;
  display: flex;
  margin-top: 30px;
}
</style>
