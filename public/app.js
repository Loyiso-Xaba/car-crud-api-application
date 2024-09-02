document.addEventListener("alpine:init", () => {
    Alpine.data('popularMake', () => ({
      cars: [],
      popularMake: '',
      addMessage: '',
      addMessageType: '',
      deleteMessage: '',
      deleteMessageType: '',
      newCar: {
        color: '',
        make: '',
        model: '',
        reg_number: ''
      },
      deleteCar: {
        reg_number: ''
      },
  
      showCars() {
        axios.get(`/api/cars`)
          .then(response => {
            this.cars = response.data;
          })
      },
  
      findMostPopularCar() {
        axios.get(`/api/popular-car`)
          .then(response => {
            this.popularMake = response.data.mostPopularCar;
            setTimeout(() => {
              this.popularMake = null;
            }, 5000);
          })
      },
  
      addNewCar() {
        if (!this.newCar.color || !this.newCar.make || !this.newCar.model || !this.newCar.reg_number) {
          this.addMessage = 'Required to fill all fields!';
          this.addMessageType = 'error';
          this.clearAddMessage();
          return;
        }
  
        const existingCar = this.cars.find(car => car.reg_number === this.newCar.reg_number);
        if (existingCar) {
          this.addMessage = 'Duplication of Registration number denied!';
          this.addMessageType = 'error';
          this.clearMessage();
          return;
        }
  
        axios.post(`/api/cars`, this.newCar)
          .then(response => {
            this.cars.push(response.data);
            this.addMessage = 'New car has been successfully added!';
            this.addMessageType = 'success';
            this.newCar = { color: '', make: '', model: '', reg_number: '' };
            this.clearAddMessage();
          })
          .catch(error => {
            this.addMessage = 'Car Addition failed!';
            this.addMessageTypeessageType = 'error';
            this.clearAddMessage();
          });
      },
  
      deleteCarEntry() {
        axios.delete(`/api/cars/${this.deleteCar.reg_number}`)
            .then(response => {
                if (response.data.message === 'Car deletion  successful!') {
                    this.cars = this.cars.filter(car => car.reg_number !== this.deleteCar.reg_number);
                    this.deleteMessage = 'Car deletion  successful!'
                    this.deleteMessageType = 'success';
                    this.deleteCar.reg_number = '';
                } else if (response.data.message === 'Requested car not available') {
                    this.deleteMessage = 'Provided car detailing inaccurate!';
                    this.deleteMessageType = 'error';
                }
                this.clearDeleteMessage();
            })
            .catch(error => {
                console.error(error);
                this.deleteMessage = 'Input Registration Identifier.';
                this.deleteMessageType = 'error';
                this.clearDeleteMessage();
            });
    },
  
      clearAddMessage() {
        setTimeout(() => {
            this.addMessage = '';
            this.addMessageType = '';
        }, 5000);
    },
  
    clearDeleteMessage() {
        setTimeout(() => {
            this.deleteMessage = '';
            this.deleteMessageType = '';
        }, 5000);
    }
    }));
  });