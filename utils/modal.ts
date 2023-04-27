import Swal from 'sweetalert2'

export const showToast = ({ title }: { title: string }) =>
  Swal.fire({
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
    icon: 'success',
    position: 'bottom-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    title,
    toast: true,
  })
