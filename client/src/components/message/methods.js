import Chatkit from '@pusher/chatkit-client';
    import axios from 'axios';

    function handleInput(event) {
      const { value, name } = event.target;

      this.setState({
        [name]: value,
      });
    }

    function connectToChatkit(event) {
      event.preventDefault();

      const { userId } = this.state;

      if (userId === null || userId.trim() === '') {
        alert('Invalid userId');
        return;
      }

      axios
        .post('http://localhost:5000/api/chatusers/', { userId })
        .then(() => {
          const tokenProvider = new Chatkit.TokenProvider({
            url: 'http://localhost:5000/api/chatusers/authenticate',
          })
          .catch((err) => {
            console.log(err);
          });

          const chatManager = new Chatkit.ChatManager({
            instanceLocator: '893a75da-bdc6-45e3-81b2-43444a509adf',
            userId,
            tokenProvider,
          });
          

          return chatManager
            .connect({
              onAddedToRoom: room => {
                const { rooms } = this.state;
                this.setState({
                  rooms: [...rooms, room],
                });
              },
            })
            .then(currentUser => {
              this.setState(
                {
                  currentUser,
                  showLogin: false,
                  rooms: currentUser.rooms,
                }
              );
            });
        })
        .catch(console.error);
    }

    export { handleInput, connectToChatkit }