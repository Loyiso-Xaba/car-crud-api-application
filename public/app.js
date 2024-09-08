document.addEventListener('alpine:init', () => {
    Alpine.data('carManager', () => ({
        cars: [],
        popularCar: null,
        newCar: { reg_number: '', make: '', model: '' },
        selectedCar: null, // Track the car currently being edited
  
        init() {
            this.fetchPopularCar();
            this.fetchCars();
        },
  
        async fetchPopularCar() {
            try {
                const response = await fetch('http://localhost:4020/api/popular-car');
                this.popularCar = await response.json();
            } catch (error) {
                console.error('Error fetching popular car:', error);
            }
        },
  
        async fetchCars() {
            try {
                const response = await fetch('http://localhost:4020/api/cars');
                this.cars = await response.json();
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        },
  
        async deleteCar(reg_number) {
            try {
                await fetch(`http://localhost:4020/api/cars/${reg_number}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
                });
                this.fetchCars(); // Refresh the car list after deletion
            } catch (error) {
                console.error('Error deleting car:', error);
            }
        },
  
        async addCar() {
            try {
                await fetch('http://localhost:4020/api/cars', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.newCar)
                });
                this.fetchCars(); // Refresh the car list after adding a new car
                this.newCar = { reg_number: '', make: '', model: '' }; // Clear the form
            } catch (error) {
                console.error('Error adding car:', error);
            }
        },
  
        async updateCar() {
            if (!this.selectedCar) {
                console.error('No car selected for update');
                return;
            }
            try {
                await fetch(`http://localhost:4020/api/cars/${this.selectedCar.reg_number}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.selectedCar)
                });
                this.fetchCars(); // Refresh the car list after updating
                this.selectedCar = null; // Clear the selected car
            } catch (error) {
                console.error('Error updating car:', error);
            }
        },
  
        selectCar(car) {
            this.selectedCar = { ...car }; // Create a copy of the car to be edited
        },
  
    }));
  });
  