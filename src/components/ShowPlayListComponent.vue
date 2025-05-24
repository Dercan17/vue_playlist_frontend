<template>
  <div class="full-width-table">
    <h1 class="green text-center">Playlists</h1>

    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Nombre exacto de la playlist" v-model="nameForSearch"
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
          <th scope=" col">ID</th>
          <th scope=" col">Nombre</th>
          <th scope=" col">descripción</th>
          <th scope=" col">Ver canciones</th>
          <th scope=" col">Acciones</th>
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
            <button class="btn btn-primary" @click="viewSongs(values.songs, values.name)"><i class="bi bi-eye"></i>
              Ver canciones</button>
          </td>

          <td>
            <button class="btn btn-danger" :disabled="isLoadingButton" @click="deletePlayList(values.name)">
              <span> <i class="bi bi-trash"></i> Borrar playlist</span>
            </button>
            <span class="loader" v-if="false" :id="'loading' + values.id"></span>
          </td>
        </tr>
      </tbody>
    </table>

  </div>


  <div class="centered-table text-center" v-if="isShowTable">

    <div style="display: inline-flex; margin-top: 10px;
    margin-bottom: -10px;">
      <h4 class="mb-1" style="    margin-right: 15px;">{{ namePlayList }}</h4>
      <button class="btn btn-outline-danger" @click="closeTableSongs()"><i class="bi bi-x-circle"></i></button>
    </div>

    <table class="table small-table">
      <thead class="thead-dark">
        <tr>
          <th scope=" col">ID</th>
          <th scope=" col">Título</th>
          <th scope=" col">Artista</th>
          <th scope=" col">Álbum</th>
          <th scope=" col">Año</th>
          <th scope=" col">Género</th>
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

  <div class="centered-button "><button class="btn btn-success" @click="showFormCreatePlayList()"><i
        class="bi bi-plus-circle"></i> Crear Playlist
    </button></div>

  <div class="container mt-5" v-if="isShowForm">

    <div style="display: inline-flex; margin-top: 10px;
    margin-bottom: -10px;">
      <h2 class="mb-1" style="    margin-right: 15px;">Crear Playlist</h2>
      <button class="btn btn-outline-danger" @click="closeFormCreatePlaylist()"><i class="bi bi-x-circle"></i></button>
    </div>
    <form @submit.prevent="submitForm">
      <!-- Campos para Nombre y Descripción -->
      <div class="mb-3">
        <label for="name" class="form-label">Nombre de la Playlist</label>
        <input type="text" class="form-control" id="name" v-model="playlist.name" required>
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Descripción</label>
        <textarea class="form-control" id="description" v-model="playlist.description" rows="3" required></textarea>
      </div>

      <h3>Cancion</h3>
      <div v-for="(song, index) in playlist.songs" :key="index" class="mb-3 border p-3 rounded">
        <div class="mb-2">
          <label class="form-label">Título de la canción</label>
          <input type="text" class="form-control" v-model="song.title" required>
        </div>
        <div class="mb-2">
          <label class="form-label">Artista</label>
          <input type="text" class="form-control" v-model="song.artist" required>
        </div>
        <div class="mb-2">
          <label class="form-label">Álbum</label>
          <input type="text" class="form-control" v-model="song.album" required>
        </div>
        <div class="mb-2">
          <label class="form-label">Año</label>
          <input type="number" class="form-control" v-model="song.year" required>
        </div>
        <div class="mb-2">
          <label class="form-label">Género</label>
          <br>
          <select v-model="song.genre" class="form-control" >
            <option selected>Seleccione un género</option>
            <option v-for=" (genre, index) in genres" :key="index" :value="genre" required>
            {{ genre }}
            </option>
          </select>
        </div>
        <button type="button" class="btn btn-danger mt-2" @click="removeSong(index)"> <i class="bi bi-trash"></i> Borrar
          canción</button>
      </div>

      <button type="button" class="btn btn-secondary mb-3" @click="addSong"><i class="bi bi-plus-circle"></i> Añadir
        canción</button>
      <br>
      <button type="submit" class="btn btn-primary"><i class="bi bi-save"></i> Guardar Playlist </button>
    </form>
  </div>
</template>

<script>
import * as requestHandler from "@/utils/services/ServicesHandler.js";
import authService from "@/utils/services/authService";
import '@fortawesome/fontawesome-free/css/all.css'

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
    const genres = ref([]);
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

    const clearInfo = () => {
      playlist.value.name = '';
      playlist.value.description = '';
      playlist.value.songs = [
        {
          title: '',
          artist: '',
          album: '',
          year: '',
          genre: ''
        }
      ];
    }


    const handleLogin = async () => {
      try {
        const data = await authService.login();

        console.log("Usuario autenticado, token guardado", data.token);
        getAllPlayList();
        getGenres();
      } catch (error) {
        console.error("Error al iniciar sesión", error);
      }
    };

 const getGenres = async () => {
   const response = await requestHandler.genres.getAllGenres();
   genres.value = response.data;      
    };

    const removeSong = (index) => {
      playlist.value.songs.splice(index, 1);
    };

    const submitForm = async () => {
      await requestHandler.playListServices.savePlayList(playlist.value);
      isShowForm.value = false;
      getAllPlayList();
      clearInfo();
    };


    const closeTableSongs = () => {
      isShowTable.value = false;
    }

    const closeFormCreatePlaylist = () => {
      isShowForm.value = false;
      clearInfo();
    }

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
      handleLogin()
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
      genres,
      viewSongs,
      getAllPlayList,
      deletePlayList,
      searchPlayListByName,
      addSong,
      removeSong,
      submitForm,
      showFormCreatePlayList,
      handleLogin,
      getGenres,
      closeTableSongs,
      closeFormCreatePlaylist,
      clearInfo

    }
  }
}
</script>
<style>
body,
html {
  height: 100%;
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(to right, #f9f9f9, #e6e6e6);
  color: #333;
}

h1,
h2,
h3 {
  color: #2c3e50;
}

input,
textarea,
select {
  margin-bottom: 0.5rem;
  border-radius: 4px;
}

.centered-table {
  justify-content: center;
  align-items: center;
  height: 100%;
}

.small-table {
  width: 80%;
  max-width: 600px;
  margin: 2rem auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

.full-width-table {
  width: 100%;
  margin: 0;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.table th {
  background-color: #f1f1f1;
}

.centered-button {
  justify-content: center;
  align-items: center;
  height: 100%;
  display: flex;
  margin-top: 30px;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}
</style>
