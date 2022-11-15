
# catchbus initial navigation
</br> with stack navigation
</br>
![image](https://user-images.githubusercontent.com/52804557/189521534-58ca8c86-e4da-4f71-9d05-77e4593dd992.png)

# catchbus_navigation
</br> 은정이 url :
API :
const API_KEY = 'UkgvlYP2LDE6M%2Blz55Fb0XVdmswp%2Fh8uAUZEzUbby3OYNo80KGGV1wtqyFG5IY0uwwF0LtSDR%2FIwPGVRJCnPyw%3D%3D';
노선 & turnYn(버스리스트) : 
      var queryParams = `?serviceKey=${API_KEY}&routeId=${routeId}`;

노선(노선리스트) :
      var queryParams = `?serviceKey=${API_KEY}&routeId=${bus.routeId}`;
      
버스 도착 : 
      var queryParams = `?serviceKey=${API_KEY}&stationId=${station.id}`;
정류소 : 
      var queryParams = `?serviceKey=${API_KEY}&keyword=${station}`;


npm install react-native-gesture-handler

npm install react-native-vector-icons
npm install react-native-select-dropdown

npm install react-native-timeline-flatlist
구글 아이콘
https://fonts.google.com/icons?selected=Material+Icons